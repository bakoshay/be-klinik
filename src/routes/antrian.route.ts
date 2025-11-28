import { Elysia } from "elysia";
import { prisma } from "../db/prisma";
import { success, error } from "../utils/response";
import { createAntrianSchema } from "../schemas/antrian.schema";
import { authMiddleware } from '../middleware/auth'
import { getLastTodayAntrian, getCurrentAntrian, formatNomorAntrian } from '../utils/antrian'
import { broadcastCurrentAntrian } from './antrian.ws.routes'
import type { Pasien } from '../types/antrian'

export const publicAntrianRoute = new Elysia({ prefix: "/antrians" })
// create antrian
  .post(
  "/",
  async ({ body }) => {

    const data = body as Pasien;

    // Create Pasien
    const pasien = await prisma.pasien.create({
      data: {
        nama: data.nama,
        nik: data.nik,
        jenis_kelamin: data.jenis_kelamin,
        keluhan: data.keluhan,
      }
    });

    // Ambil nomor antrian hari ini
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const last = await prisma.antrian.findFirst({
      where: {
        tanggal: {
          gte: todayStart,
          lte: todayEnd
        }
      },
      orderBy: { nomor: "desc" }
    });

    let nextNumber = last ? last.nomor + 1 : 1;

    await prisma.antrian.create({
      data: {
        tanggal: new Date(),
        prefix: "U",
        nomor: nextNumber,
        status: false,
        pasien_id: pasien.id
      }
    });

    const nomor_format = `U-${String(nextNumber).padStart(2, "0")}`;

    return success("Antrian berhasil dibuat", {
      nomor: nomor_format,
      raw: nextNumber
    })
  },
  {
    body: createAntrianSchema
  }
);

export const privateAntrianRoute = new Elysia({ prefix: "/antrians" })
  .use(authMiddleware)
  // GET antrian sekarang (yang sedang menunggu dipanggil)
  .get("/", async () => {
      let current = await getCurrentAntrian();
      if (!current) {
        current = await getLastTodayAntrian();
        if (!current) return error("Tidak ada antrian hari ini", 404);
      }

      return success("Antrian sekarang", {
        nomor: formatNomorAntrian(current.prefix, current.nomor),
        pasien: current.pasien.nama,
      });
  })

  // NEXT antrian (selesaikan antrian sekarang, ambil berikutnya)
  .post("/next", async () => {
      const current = await getCurrentAntrian();
      if (!current) return error("Tidak ada antrian yang bisa di-next", 404);

      await prisma.antrian.update({
        where: { id: current.id },
        data: { status: true }
      });

      let next = await getCurrentAntrian();
      await broadcastCurrentAntrian();

      if (!next) {
        next = await getLastTodayAntrian();
        if (!next) return success("Semua antrian sudah selesai", null);
      }

      return success("Antrian berikutnya", {
        nomor: formatNomorAntrian(next.prefix, next.nomor),
        pasien: next.pasien.nama,
      });
  })
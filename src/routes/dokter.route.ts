import { Elysia } from "elysia";
import { prisma } from "../db/prisma";
import { success, error } from "../utils/response";
import {
  createDokterSchema,
  updateDokterSchema,
} from "../schemas/dokter.schema";
import { authMiddleware } from '../middleware/auth'
import {isValidDay, mapSchedules} from '../utils/dokter'
import type { Dokter, Schedule } from '../types/dokter'
import type { Hari } from '@prisma/client'

export const publicDokterRoute = new Elysia({ prefix: "/dokters" })
// GET BY DAY
  .get("/hari", async ({ query }) => {
  const day = query.day as string;

  if (!day) {
    return error("Parameter 'hari' wajib diisi", 400);
  }

  // Validasi hari agar sesuai enum Hari
  if (!isValidDay(day)) {
    return error("Hari tidak valid", 400);
  }

  const list = await prisma.dokter.findMany({
    where: {
      jadwal_dokter: {
        some: { hari: day as Hari },
      }
    },
    include: {
      jadwal_dokter: {
        where: { hari: day as Hari}
      }
    },
    orderBy: { nama: "asc" },
  });

  return success(`Daftar dokter untuk hari ${day}`, list);
  })

export const privateDokterRoute = new Elysia({ prefix: "/dokters" })
  .use(authMiddleware)
  // CREATE
  .post(
    "/",
    async ({ body }) => {
      const data = body as Dokter
      await prisma.dokter.create({
        data: {
          nama: data.name,
          spesialis: data.specialty,
          jenis_kelamin: data.gender,
          handphone: data.phone,
          alamat: data.address,
          status: data.is_active,

          jadwal_dokter: {
            create: mapSchedules(data.schedules),
          },
        },
        include: { jadwal_dokter: true },
      });

      return success("Dokter berhasil ditambahkan");
    },
    { body: createDokterSchema }
  )

  // GET ALL
  .get("/", async ({query}) => {
    const search = query.search ?? '';

    const list = await prisma.dokter.findMany({
      where: {
        OR: [
          { nama: { contains: search, } },
          { spesialis: { contains: search, } },
          { alamat: { contains: search, } },
          { handphone: { contains: search, } },
        ]
      },
      include: { jadwal_dokter: true },
      orderBy: { createdAt: "desc" },
    });

    return success("Berhasil mendapatkan data dokter", list);
  })

  // GET BY ID
  .get("/:id", async ({ params }) => {
    const dokter = await prisma.dokter.findUnique({
      where: { id: params.id },
      include: { jadwal_dokter: true },
    });

    if (!dokter) return error("Dokter tidak ditemukan");

    return success("Detail dokter ditemukan", dokter);
  })

  // UPDATE
  .put(
    "/:id",
    async ({ body, params }) => {
      const exists = await prisma.dokter.findUnique({
        where: { id: params.id },
      });

      if (!exists) return error("Dokter tidak ditemukan");

      // Update main data
      const data = body as Dokter
      await prisma.dokter.update({
        where: { id: params.id },
        data: {
          nama: data.name,
          spesialis: data.specialty,
          jenis_kelamin: data.gender,
          handphone: data.phone,
          alamat: data.address,
          status: data.is_active,
        },
      });

      // Jika schedules dikirim dari FE → replace semua jadwal
      if (data.schedules) {
        await prisma.jadwal_Dokter.deleteMany({
          where: { dokterId: params.id },
        });

        await prisma.jadwal_Dokter.createMany({
          data: data.schedules.map((s: Schedule) => ({
            dokterId: params.id,
            hari: s.day as Hari,
            jam_mulai: s.start,
            jam_selesai: s.end,
          })),
        });
      }

      await prisma.dokter.findUnique({
        where: { id: params.id },
        include: { jadwal_dokter: true },
      });

      return success("Dokter berhasil diupdate");
    },
    { body: updateDokterSchema }
  )

  // DELETE
  .delete("/:id", async ({ params }) => {
    const exists = await prisma.dokter.findUnique({
      where: { id: params.id },
    });

    if (!exists) return error("Dokter tidak ditemukan");

    await prisma.jadwal_Dokter.deleteMany({
      where: { dokterId: params.id },
    });

    await prisma.dokter.delete({
      where: { id: params.id },
    });

    return success("Dokter berhasil dihapus");
  });

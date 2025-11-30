import {Elysia} from 'elysia';
import {prisma} from '../db/prisma';
import {success} from '../utils/response';
import {authMiddleware} from '../middleware/auth';
import {PembayaranSchema} from '../schemas/pembayaran.schema';
import type {Pembayaran} from '../types/pembayaran';

export const privatePembayaranRoute = new Elysia({prefix: '/pembayarans'})
  .use(authMiddleware)
  // CREATE
  .post(
    "/",
    async ({ body }) => {
      const data = body as Pembayaran;

      await prisma.pembayaran.create({
        data: {
          pasien: data.pasien,
          biaya_layanan: data.biaya_layanan,
          jumlah_bayar: data.jumlah_bayar,
          kembalian: data.kembalian ?? null,
          metode: data.metode,
          sub_total: data.sub_total,
          total: data.total,
          detail_obat: {
            create: data.obat.map((item) => ({
              obatId: item.id,
              nama: item.nama,
              harga: item.harga,
              qty: item.qty,
              total: item.total,
            })),
          },
        },
        include: { detail_obat: true }
      });

      return success("Pembayaran berhasil dibuat");
    },
    { body: PembayaranSchema }
  );
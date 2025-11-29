import { Elysia } from "elysia";
import { prisma } from "../db/prisma";
import { success, error } from "../utils/response";
import { ObatSchema } from "../schemas/obat.schema";
import { authMiddleware } from '../middleware/auth'
import type { Obat } from '../types/obat'

export const privateObatRoute = new Elysia({ prefix: "/obats" })
  .use(authMiddleware)
  // CREATE
  .post(
    "/",
    async ({ body }) => {
      const data = body as Obat
      await prisma.obat.create({
        data: data
      })

      return success("Obat berhasil ditambahkan");
    }
  , { body: ObatSchema })

  // GET ALL
  .get("/", async ({ query }) => {
    const search = query.search ?? '';

    const list = await prisma.obat.findMany({
      where: {
        OR: [
          { nama: { contains: search}},
        ]
      },
      orderBy: { nama: "desc" },
    })

    return success("Daftar obat", list);
  })

  // GET OBAT BY STATUS (TRUE)
  .get("/available", async () => {
    const list = await prisma.obat.findMany({
      where: { status: true },
      orderBy: { nama: "desc" },
    })

    return success("Daftar obat tersedia", list);
  })

  // UPDATE
  .put(
    "/:id",
    async ({ params, body }) => {
      const id = params.id;
      const data = body as Obat
      
      const exists = await prisma.obat.findUnique({
        where: { id: params.id}
      })

      if (!exists) return error("Obat tidak ditemukan");

      await prisma.obat.update({
        where: {id: params.id},
        data: data
      })

      return success("Obat berhasil diperbarui");
    },
    { body: ObatSchema })

  // DELETE
  .delete("/:id", async ({ params }) => {
    const exists = await prisma.obat.findUnique({
      where: { id: params.id }
    })

    if (!exists) return error("Obat tidak ditemukan");

    await prisma.obat.delete({
      where: { id: params.id }
    })
    
    return success("Obat berhasil dihapus");
  
  })
    
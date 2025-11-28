import { t } from "elysia";

export const createAntrianSchema = t.Object({
  nama: t.String(),
  nik: t.String(),
  jenis_kelamin: t.String(),
  keluhan: t.String(),
});
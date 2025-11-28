import { t } from "elysia";

export const ObatSchema = t.Object({
  nama: t.String(),
  jenis: t.Enum({ tablet: "tablet", kapsul: "kapsul", kaplet: "kaplet" }),
  harga: t.Number(),
  status: t.Boolean(),
})
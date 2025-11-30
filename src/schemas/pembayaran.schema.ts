import { t } from 'elysia'

export const DetailObatSchema = t.Object({
  id: t.String(),
  nama: t.String(),
  harga: t.Number(),
  qty: t.Number(),
  total: t.Number(),
})

export const PembayaranSchema = t.Object({
  pasien: t.String(),
  biaya_layanan: t.Number(),
  jumlah_bayar: t.Number(),
  kembalian: t.Optional(t.Number()),
  metode: t.String(),
  sub_total: t.Number(),
  total: t.Number(),
  obat: t.Array(DetailObatSchema),
})
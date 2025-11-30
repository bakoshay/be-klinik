export interface DetailObat {
  id: string;
  nama: string;
  harga: number;
  qty: number;
  total: number;
}

export interface Pembayaran {
  pasien: string;
  biaya_layanan: number;
  jumlah_bayar: number;
  kembalian?: number;
  metode: 'cash' | 'qris';
  sub_total: number;
  total: number;
  obat: DetailObat[];
}


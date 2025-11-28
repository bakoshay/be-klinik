export interface Obat {
  nama: string;
  jenis: "tablet" | "kapsul" | "kaplet";
  harga: number;
  status: boolean;
}
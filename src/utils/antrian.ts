import { prisma } from "../db/prisma";

// Mengambil antrian terakhir pada hari ini
export const getLastTodayAntrian = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  return prisma.antrian.findFirst({
    where: {
      tanggal: {
        gte: todayStart,
        lte: todayEnd
      }
    },
    orderBy: { nomor: "desc" },
    include: { pasien: true }
  });
};

// Mengambil antrian sekarang (yang sedang menunggu dipanggil)
export const getCurrentAntrian = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  return prisma.antrian.findFirst({
    where: {
      status: false,
      tanggal: {
        gte: todayStart,
        lte: todayEnd
      }
    },
    orderBy: { nomor: "asc" },
    include: { pasien: true }
  });
};

// Mengambil daftar antrian berikutnya setelah nomor saat ini
export const getNextAntrianList = async (currentNomor: number | null) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  return prisma.antrian.findMany({
    where: {
      status: false,
      tanggal: {
        gte: todayStart,
        lte: todayEnd
      },
      ...(currentNomor && { nomor: { gt: currentNomor } })
    },
    orderBy: { nomor: "asc" },
    take: 4,
    include: { pasien: true }
  });
};

// Format nomor antrian dengan prefix dan padding nol
export const formatNomorAntrian = (prefix: string, nomor: number) =>
  `${prefix}-${String(nomor).padStart(2, "0")}`;
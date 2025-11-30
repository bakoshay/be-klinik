-- CreateTable
CREATE TABLE `Pembayaran` (
    `id` VARCHAR(191) NOT NULL,
    `pasien` VARCHAR(191) NOT NULL,
    `biaya_layanan` INTEGER NOT NULL,
    `jumlah_bayar` INTEGER NOT NULL,
    `kembalian` INTEGER NULL,
    `metode` ENUM('cash', 'qris') NOT NULL,
    `sub_total` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailObatPembayaran` (
    `id` VARCHAR(191) NOT NULL,
    `pembayaranId` VARCHAR(191) NOT NULL,
    `obatId` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetailObatPembayaran` ADD CONSTRAINT `DetailObatPembayaran_pembayaranId_fkey` FOREIGN KEY (`pembayaranId`) REFERENCES `Pembayaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `Pasien` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `keluhan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pasien_nik_key`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Antrian` (
    `id` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL DEFAULT 'U',
    `nomor` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `pasien_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Antrian` ADD CONSTRAINT `Antrian_pasien_id_fkey` FOREIGN KEY (`pasien_id`) REFERENCES `Pasien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

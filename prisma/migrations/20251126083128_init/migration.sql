-- CreateTable
CREATE TABLE `Dokter` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `spesialis` VARCHAR(191) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `handphone` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jadwal_Dokter` (
    `id` VARCHAR(191) NOT NULL,
    `dokterId` VARCHAR(191) NOT NULL,
    `hari` ENUM('senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu') NOT NULL,
    `jam_mulai` VARCHAR(191) NOT NULL,
    `jam_selesai` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jadwal_Dokter` ADD CONSTRAINT `Jadwal_Dokter_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `Dokter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tittle` VARCHAR(255) NOT NULL,
    `completed` BOOLEAN NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT (curtime()),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

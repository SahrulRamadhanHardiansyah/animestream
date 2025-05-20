-- CreateTable
CREATE TABLE `Collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animeId` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `anime_image` VARCHAR(191) NULL,
    `anime_title` VARCHAR(191) NULL,

    UNIQUE INDEX `Collection_user_email_animeId_key`(`user_email`, `animeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anime_mal_id` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `anime_title` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

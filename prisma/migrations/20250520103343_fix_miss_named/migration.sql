/*
  Warnings:

  - You are about to drop the column `anime_mal_id` on the `comment` table. All the data in the column will be lost.
  - Added the required column `animeId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `anime_mal_id`,
    ADD COLUMN `animeId` VARCHAR(191) NOT NULL;

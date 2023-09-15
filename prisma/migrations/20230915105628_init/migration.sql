/*
  Warnings:

  - You are about to drop the `house` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_builtById_fkey`;

-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_ownerId_fkey`;

-- DropTable
DROP TABLE `house`;

/*
  Warnings:

  - Made the column `country` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `country` VARCHAR(100) NOT NULL,
    MODIFY `postalCode` VARCHAR(10) NOT NULL;

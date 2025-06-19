/*
  Warnings:

  - You are about to drop the column `image` on the `canapes` table. All the data in the column will be lost.
  - Added the required column `ean` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garantie` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poids` to the `canapes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canapes" DROP COLUMN "image",
ADD COLUMN     "ean" BIGINT NOT NULL,
ADD COLUMN     "garantie" INTEGER NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "poids" INTEGER NOT NULL,
ADD COLUMN     "typeCanape" TEXT NOT NULL DEFAULT 'standard';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT;

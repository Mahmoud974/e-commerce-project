/*
  Warnings:

  - You are about to drop the column `couleur` on the `canapes` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `canapes` table. All the data in the column will be lost.
  - You are about to drop the column `prix` on the `canapes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `canapes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecoMobilier` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fabricType` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `canapes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `canapes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canapes" DROP COLUMN "couleur",
DROP COLUMN "nom",
DROP COLUMN "prix",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "ecoMobilier" INTEGER NOT NULL,
ADD COLUMN     "fabricType" TEXT NOT NULL,
ADD COLUMN     "miniDescription" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "reference" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "canapes_reference_key" ON "canapes"("reference");

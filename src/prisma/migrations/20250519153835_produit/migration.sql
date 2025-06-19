/*
  Warnings:

  - You are about to drop the column `original_price` on the `produits` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `produits` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `produits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `produits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `produits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disponibilite` to the `produits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ean` to the `produits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ecoMobilier` to the `produits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `produits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `produits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "produitId" INTEGER;

-- AlterTable
ALTER TABLE "produits" DROP COLUMN "original_price",
DROP COLUMN "seller",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "disponibilite" BOOLEAN NOT NULL,
ADD COLUMN     "ean" BIGINT NOT NULL,
ADD COLUMN     "ecoMobilier" INTEGER NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "produits_reference_key" ON "produits"("reference");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

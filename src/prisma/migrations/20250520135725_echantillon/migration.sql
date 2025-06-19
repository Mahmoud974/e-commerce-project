-- CreateTable
CREATE TABLE "echantillons" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "care" TEXT NOT NULL,
    "images" TEXT NOT NULL,

    CONSTRAINT "echantillons_pkey" PRIMARY KEY ("id")
);

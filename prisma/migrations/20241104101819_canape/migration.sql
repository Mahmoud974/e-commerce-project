-- CreateTable
CREATE TABLE "canapes" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "couleur" TEXT[],
    "largeur" TEXT NOT NULL,
    "profondeur" TEXT NOT NULL,
    "hauteur" TEXT NOT NULL,
    "disponibilite" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "canapes_pkey" PRIMARY KEY ("id")
);

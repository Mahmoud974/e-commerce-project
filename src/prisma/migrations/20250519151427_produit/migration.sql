-- CreateTable
CREATE TABLE "produits" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "original_price" DOUBLE PRECISION,
    "discount" TEXT,
    "seller" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,

    CONSTRAINT "produits_pkey" PRIMARY KEY ("id")
);

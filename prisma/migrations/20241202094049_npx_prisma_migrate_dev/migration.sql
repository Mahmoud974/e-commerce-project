-- AlterTable
ALTER TABLE "canapes" ADD COLUMN     "color" TEXT NOT NULL DEFAULT 'default_color',
ADD COLUMN     "seat" INTEGER NOT NULL DEFAULT 1;

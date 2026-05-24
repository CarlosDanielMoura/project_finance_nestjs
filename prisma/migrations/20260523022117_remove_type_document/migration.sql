/*
  Warnings:

  - Changed the type of `document` on the `Store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "document",
ADD COLUMN     "document" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TypeDocument";

-- CreateIndex
CREATE UNIQUE INDEX "Store_document_key" ON "Store"("document");

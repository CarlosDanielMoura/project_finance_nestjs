/*
  Warnings:

  - You are about to drop the column `cpf` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Client_cpf_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "cpf",
ADD COLUMN     "document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_document_key" ON "Client"("document");

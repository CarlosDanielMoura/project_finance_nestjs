/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeDocument" AS ENUM ('CPF', 'CNPJ');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "document" "TypeDocument" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_document_key" ON "Store"("document");

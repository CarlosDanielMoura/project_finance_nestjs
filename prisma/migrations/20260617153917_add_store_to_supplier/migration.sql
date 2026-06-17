/*
  Warnings:

  - You are about to drop the column `userId` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_usersId_fkey";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "userId",
DROP COLUMN "usersId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

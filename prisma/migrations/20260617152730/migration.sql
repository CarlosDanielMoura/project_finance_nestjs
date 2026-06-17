-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "userId" TEXT,
ADD COLUMN     "usersId" TEXT;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

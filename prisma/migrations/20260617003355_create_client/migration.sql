-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "zipCode" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

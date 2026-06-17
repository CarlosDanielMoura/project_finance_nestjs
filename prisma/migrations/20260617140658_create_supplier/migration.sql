-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "nameContact" TEXT,
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_document_key" ON "Supplier"("document");

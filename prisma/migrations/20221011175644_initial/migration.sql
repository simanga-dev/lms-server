-- CreateTable
CREATE TABLE "Livestock" (
    "id" TEXT NOT NULL,
    "ref_number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ring_bell" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Livestock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Livestock_created_at_key" ON "Livestock"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "Livestock_updated_at_key" ON "Livestock"("updated_at");

-- CreateTable
CREATE TABLE "images" (
    "id" VARCHAR(32) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "category_id" VARCHAR(32) NOT NULL,
    "tags" TEXT[],
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

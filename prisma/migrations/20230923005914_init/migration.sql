-- CreateTable
CREATE TABLE "images" (
    "id" VARCHAR(36) NOT NULL,
    "url" TEXT NOT NULL,
    "keyword" VARCHAR(50) NOT NULL DEFAULT '',
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

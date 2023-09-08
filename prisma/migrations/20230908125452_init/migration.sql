-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL DEFAULT 1,
    "title" VARCHAR(50) NOT NULL DEFAULT '',
    "url" TEXT NOT NULL,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "ja_name" VARCHAR(20) NOT NULL,
    "en_name" VARCHAR(20) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

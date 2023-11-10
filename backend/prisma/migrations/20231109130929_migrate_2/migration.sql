/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- DropTable
DROP TABLE "Item";

-- DropEnum
DROP TYPE "ItemType";

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "classId" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL DEFAULT 0,
    "def" INTEGER NOT NULL DEFAULT 0,
    "int" INTEGER NOT NULL DEFAULT 0,
    "sta" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_classId_fkey" FOREIGN KEY ("classId") REFERENCES "UserClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

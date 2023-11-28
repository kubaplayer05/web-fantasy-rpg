/*
  Warnings:

  - Added the required column `desc` to the `Weapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minUserLvl` to the `Weapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "equipedWeaponId" INTEGER;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "minUserLvl" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_equipedWeaponId_fkey" FOREIGN KEY ("equipedWeaponId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

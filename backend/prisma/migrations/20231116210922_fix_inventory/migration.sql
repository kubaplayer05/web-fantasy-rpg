/*
  Warnings:

  - You are about to drop the column `userInventoryId` on the `Weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_userInventoryId_fkey";

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "userInventoryId";

-- CreateTable
CREATE TABLE "_UserInventoryToWeapon" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserInventoryToWeapon_AB_unique" ON "_UserInventoryToWeapon"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInventoryToWeapon_B_index" ON "_UserInventoryToWeapon"("B");

-- AddForeignKey
ALTER TABLE "_UserInventoryToWeapon" ADD CONSTRAINT "_UserInventoryToWeapon_A_fkey" FOREIGN KEY ("A") REFERENCES "UserInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInventoryToWeapon" ADD CONSTRAINT "_UserInventoryToWeapon_B_fkey" FOREIGN KEY ("B") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSettingsUser_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userStatsUser_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "userSettingsUser_id" TEXT NOT NULL,
ADD COLUMN     "userStatsUser_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserStats" (
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

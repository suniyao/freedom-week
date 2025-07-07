/*
  Warnings:

  - You are about to drop the column `userSettingsUser_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userStatsUser_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userSettingsUser_id",
DROP COLUMN "userStatsUser_id",
ALTER COLUMN "profile_picture_url" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "ranked" BOOLEAN NOT NULL,
    "total_milliseconds_spent" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionData" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "milliseconds_spent" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionData_id_key" ON "QuestionData"("id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "UserStats"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionData" ADD CONSTRAINT "QuestionData_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

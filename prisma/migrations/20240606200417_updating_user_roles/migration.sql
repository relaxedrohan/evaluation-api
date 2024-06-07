/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `account` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "account" DROP COLUMN "isAdmin",
ADD COLUMN     "userRole" "UserRoles" NOT NULL DEFAULT 'USER';

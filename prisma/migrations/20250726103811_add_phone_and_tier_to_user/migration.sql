-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "tier" TEXT NOT NULL DEFAULT 'iconic';

/*
  Warnings:

  - Added the required column `userId` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "map" TEXT NOT NULL,
    "playlist" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_game" ("id", "map", "playlist") SELECT "id", "map", "playlist" FROM "game";
DROP TABLE "game";
ALTER TABLE "new_game" RENAME TO "game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

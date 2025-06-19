// This file exports a single PrismaClient instance
// to avoid creating multiple connections to the database.
// It should be imported wherever Prisma access is needed.

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  // Use Turso/libsql for production, SQLite for local development
  if (url && url.startsWith('libsql://')) {
    // Extract auth token from URL query params
    const urlObj = new URL(url);
    const authToken = urlObj.searchParams.get('authToken') || '';
    const cleanUrl = urlObj.origin + urlObj.pathname;

    const adapter = new PrismaLibSql({ url: cleanUrl, authToken });
    return new PrismaClient({ adapter });
  }

  // Local SQLite
  return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

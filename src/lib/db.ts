import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  // Use Turso/libsql for production, SQLite for local development
  if (url && url.startsWith('libsql://')) {
    const client = createClient({ url });
    const adapter = new PrismaLibSql(client);
    return new PrismaClient({ adapter });
  }

  // Local SQLite
  return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

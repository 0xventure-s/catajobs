import { PrismaClient } from "@prisma/client";

const prismaUrl =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

if (prismaUrl) {
  process.env.DATABASE_URL ??= prismaUrl;
  process.env.POSTGRES_PRISMA_URL ??= prismaUrl;
  process.env.POSTGRES_URL_NON_POOLING ??= prismaUrl;
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

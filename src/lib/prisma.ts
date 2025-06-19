import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = prismaClientSingleton();
} else {
  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
  globalThis.prismaGlobal = prisma;
}

export default prisma;

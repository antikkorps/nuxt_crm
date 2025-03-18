import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : global.__prisma || (global.__prisma = new PrismaClient())

export default prisma

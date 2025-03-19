import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()

// N'affectez à global que dans des environnements non-production et non-edge
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma

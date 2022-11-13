import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"


export async function userRoutes(fastfy: FastifyInstance) {
    fastfy.get('/users/count', async () => {
        const count = await prisma.user.count()
        return { count }
    })

}

import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt';

import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { gameRoutes } from './routes/game';
import { authRoutes } from './routes/auth';



async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    try {

        await fastify.register(cors, {
            origin: true
        })

        await fastify.register(jwt, {
            secret: "nlwcopa"
        })

        fastify.register(authRoutes)
        fastify.register(gameRoutes)
        fastify.register(guessRoutes)
        fastify.register(poolRoutes)
        fastify.register(userRoutes)

        await fastify.listen({ port: 3333, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)

        process.exit(1)
    }

}

bootstrap()
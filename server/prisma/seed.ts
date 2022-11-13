import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Marco Aurélio',
            email: 'jesse@prisma.com',
            avatar: 'https://github.com/mmmarco9.png',


        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-01T22:41:43.752Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'EUA'

        }
    })


    await prisma.game.create({
        data: {
            date: '2022-11-01T22:41:43.752Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'DE',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }

        }
    })
}

main()
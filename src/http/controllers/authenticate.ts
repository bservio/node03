import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateService } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	})

	const { email, password } = authenticateBodySchema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const authenticateService = new AuthenticateService(usersRepository)
		await authenticateService.execute({
			email,
			password
		})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({
				message: err.message
			})
		}
		return reply.status(500).send()
	}

	return reply.status(200).send()
}
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterService } from '@/services/register'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(8),
	})

	const { name, email, password } = registerBodySchema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const registerService = new RegisterService(usersRepository)
		await registerService.execute({
			name,
			email,
			password
		})
	} catch (err) {
		if(err instanceof UserAlreadyExistsError){
			return reply.status(409).send({
				message: err.message
			})
		}
		return reply.status(500).send()
	}

	return reply.status(201).send()
}
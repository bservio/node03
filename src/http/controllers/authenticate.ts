import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	})

	const { email, password } = authenticateBodySchema.parse(request.body)

	try {
		const authenticateService = makeAuthenticateService()
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
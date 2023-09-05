import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
	const usersRepository = new PrismaUsersRepository()
	const authenticateService = new AuthenticateService(usersRepository)

	return authenticateService
}
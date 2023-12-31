import { RegisterService } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeRegisterService() {
	const usersRepository = new PrismaUsersRepository()
	const service = new RegisterService(usersRepository)

	return service
}
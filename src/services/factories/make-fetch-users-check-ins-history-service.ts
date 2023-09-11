import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUsersCheckInsHistoryService } from '../fetch-users-check-ins-history'

export function makeFetchUsersCeckInsHistoryService() {
	const checkInsRepository = new PrismaCheckInsRepository()
	const service = new FetchUsersCheckInsHistoryService(checkInsRepository)

	return service
}
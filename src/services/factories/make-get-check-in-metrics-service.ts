import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetCheckInMetricsService } from '../get-check-in-metrics'

export function makeGetCheckInMetricsService() {
	const checkInsRepository = new PrismaCheckInsRepository()
	const service = new GetCheckInMetricsService(checkInsRepository)

	return service
}
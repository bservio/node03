import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUsersCheckInsHistoryServiceRequest {
	userId: string
	page: number
}

interface FetchUsersCheckInsHistoryServiceResponse {
	checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryService {
	constructor(private checkInsRepository: CheckInsRepository) { }

	async execute({
		userId,
		page
	}: FetchUsersCheckInsHistoryServiceRequest): Promise<FetchUsersCheckInsHistoryServiceResponse> {
		const checkIns = await this.checkInsRepository.findManybyUserId(userId, page)

		return {
			checkIns
		}
	}
}
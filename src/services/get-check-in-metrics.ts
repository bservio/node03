import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetCheckInMetricsRequest {
	userId: string
}

interface GetCheckInMetricsResponse {
	checkInsCount: number
}
export class GetCheckInMetricsService {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId
	}: GetCheckInMetricsRequest): Promise<GetCheckInMetricsResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		return {
			checkInsCount
		}
	}
}
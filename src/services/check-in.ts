import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInServiceRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLogitude: number
}
interface CheckInServiceResponse {
	checkIn: CheckIn
}
export class CheckInService {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsrepository: GymsRepository
	) {}

	async execute({ 
		gymId, 
		userId 
	}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const gym = await this.gymsrepository.findById(gymId)

		if(!gym) {
			throw new ResourceNotFoundError()
		}

		//calcular a distância entre usuário e academia

		const checkInOnSameDate = await this.checkInsRepository.findUserIdOnDate(
			userId,
			new Date()
		)
		
		if (checkInOnSameDate) {
			throw new Error()
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId
		})

		return {
			checkIn,
		}
	}
}
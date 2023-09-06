import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/calculate-distance-betwwen-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

interface CheckInServiceRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
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
		userId,
		userLatitude,
		userLongitude 
	}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const gym = await this.gymsrepository.findById(gymId)

		if(!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordinates(
			{latitude: userLatitude, longitude: userLongitude},
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		)

		const MAX_DISTANCE = 0.1 //100 meters ou 1 km

		if (distance > MAX_DISTANCE) {
			throw new MaxDistanceError()
		}

		const checkInOnSameDate = await this.checkInsRepository.findUserIdOnDate(
			userId,
			new Date()
		)
		
		if (checkInOnSameDate) {
			throw new MaxNumberOfCheckInsError()
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
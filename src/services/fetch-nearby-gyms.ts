import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymsServiceRequest {
	userLatitude: number
	userLongitude: number
}

interface FetchNearbyGymsServiceReponse {
	gyms: Gym[]
}

export class FetchNearbyGymsService {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({ userLatitude, userLongitude }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceReponse> {
		const gyms = await this.gymsRepository.fetchNearbyGyms({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return {
			gyms,
		}
	}
}
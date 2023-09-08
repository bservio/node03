import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetCheckInMetricsService } from './get-check-in-metrics'


let checkInsRepository: InMemoryCheckInsRepository

let sut: GetCheckInMetricsService

describe('Get User Metrics Service', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new GetCheckInMetricsService(checkInsRepository)

	})


	it('should be able to get check-ins count from metrics', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		})

		const { checkInsCount } = await sut.execute({
			userId: 'user-01'
		})

		expect(checkInsCount).toEqual(2)
	
	})

})


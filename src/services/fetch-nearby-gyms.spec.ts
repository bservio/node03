import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new FetchNearbyGymsService(gymsRepository)


	})

	it('should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-5.0518199),
			longitude: new Decimal(-42.7759954),
		})

		await gymsRepository.create({
			title: 'Far away Gym',
			description: '',
			phone: '',
			latitude: new Decimal(- 5.044249),
			longitude: new Decimal(-42.4553237),
		})


		const { gyms } = await sut.execute({
			userLatitude: -5.0518199,
			userLongitude: -42.7759954,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Near Gym' })
		])
	})

})








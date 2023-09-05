import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memor-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: CheckInService

describe('Check-in service', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckInService(checkInsRepository)
	})

	it('should be able to check in', async () => {
		const { checkIn} = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

})
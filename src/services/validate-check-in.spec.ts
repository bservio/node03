import { ValidateCheckInService } from './validate-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check-In Service', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInService(checkInsRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to validate the check-in', async () => {
		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'Gym-01',
			user_id: 'user-01',
		})

		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
		expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
	})

	it('should not be able to validate a non-existing check-in', async () => {
		await expect(() => 
			sut.execute({
				checkInId: 'non-existing-id'
			})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should not be able to validate the check-in 20 minutes after its validation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'Gym-01',
			user_id: 'user-01',
		})

		const twentyOneMinutesInMs = 21 * 60 * 1000

		vi.advanceTimersByTime(twentyOneMinutesInMs)

		await expect(() => sut.execute({
			checkInId: createdCheckIn.id
		})
		).rejects.toBeInstanceOf(LateCheckInValidationError)
	})
})
import { CheckInService } from './check-in'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: CheckInService

describe('Check-in service', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckInService(checkInsRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn} = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice on the same day', async () => {
		vi.setSystemTime(new Date(2023, 0, 15, 8, 0, 0))
		
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		await expect(() => 
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
			})).rejects.toBeInstanceOf(Error)
	})

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2023, 0, 15, 8, 0, 0))
		
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})
		
		vi.setSystemTime(new Date(2023, 0, 16, 8, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

})

// TDD - Tests Driven Development
// Baseado no princípio de fazer o teste antes do serviço
// Red - Ao fazer o teste ele deve retornar uma falha (RED), falha que deve ser consertada no serviço
// Green - Deve ser feita a implementação do serviço da forma mais simples para que o teste passe ... que dê Green.
// Refactor - Etapa dedicada à refatorar o código.
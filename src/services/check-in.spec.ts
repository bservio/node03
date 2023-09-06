import { CheckInService } from './check-in'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in service', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInService(checkInsRepository, gymsRepository)

		gymsRepository.items.push({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-5.0518199),
			longitude: new Decimal(-42.7759954),
		})

		await gymsRepository.create({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: -5.0518199,
			longitude: -42.7759954,
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	// user coordenates -5.0518199,-42.7759954

	it('should be able to check in', async () => {
		const { checkIn} = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -5.0518199,
			userLongitude: -42.7759954
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice on the same day', async () => {
		vi.setSystemTime(new Date(2023, 0, 15, 8, 0, 0))
		
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -5.0518199,
			userLongitude: -42.7759954
		})

		await expect(() => 
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: -5.0518199,
				userLongitude: -42.7759954
			})).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
	})

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2023, 0, 15, 8, 0, 0))
		
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -5.0518199,
			userLongitude: -42.7759954
		})
		
		vi.setSystemTime(new Date(2023, 0, 16, 8, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -5.0518199,
			userLongitude: -42.7759954
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check-in in a distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym-02',
			title: 'Distant Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-5.0893898),
			longitude: new Decimal(-42.7504754),
		})

		await expect(() =>
			sut.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -5.0518199,
				userLongitude: -42.7759954
			})).rejects.toBeInstanceOf(MaxDistanceError)
	})

})

// TDD - Tests Driven Development
// Baseado no princípio de fazer o teste antes do serviço
// Red - Ao fazer o teste ele deve retornar uma falha (RED), falha que deve ser consertada no serviço
// Green - Deve ser feita a implementação do serviço da forma mais simples para que o teste passe ... que dê Green.
// Refactor - Etapa dedicada à refatorar o código.
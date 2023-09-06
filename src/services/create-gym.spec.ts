import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService


describe('Create Gym Service', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymService(gymsRepository)
		//sut = service under test
	})

	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'Teste Gym',
			description: null,
			phone: null,
			latitude: -5.0893898,
			longitude: -42.7504754
		})

		expect(gym.id).toEqual(expect.any(String))
	})

	
})
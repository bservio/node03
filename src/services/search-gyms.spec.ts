import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { SearchGymService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gyms Service', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymService(gymsRepository)

			
	})

	it('should be able to search for a Gym', async () => {
		await gymsRepository.items.push({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-5.0518199),
			longitude: new Decimal(-42.7759954),
		})	

		const { gyms } = await sut.execute({
			page: 1,
			query: 'JavaScript'
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym'})
		])
	})

	it('should be able to fetch paginated gym search', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `JavaScript Gym ${i}`,
				description: null,
				phone: null,
				latitude: -27.2092052,
				longitude: -49.6401091,
			})
		}

		console.log(gymsRepository)

		const { gyms } = await sut.execute({
			query: 'JavaScript',
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym 21' }),
			expect.objectContaining({ title: 'JavaScript Gym 22' }),
		])
	})
})








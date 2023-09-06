import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUsersCheckInsHistoryService } from './fetch-users-check-ins-history'


let checkInsRepository: InMemoryCheckInsRepository

let sut: FetchUsersCheckInsHistoryService

describe('Fetch User Check-In History', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new FetchUsersCheckInsHistoryService(checkInsRepository)

	})


	it('should be able to fetch user check-in history', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		})

		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 1
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		])
	})

	it('should be able to fetch paginated check-in history', async () => {
		for (let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01',
			})
		}


		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 2
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' }),
		])
	})

})

// TDD - Tests Driven Development
// Baseado no princípio de fazer o teste antes do serviço
// Red - Ao fazer o teste ele deve retornar uma falha (RED), falha que deve ser consertada no serviço
// Green - Deve ser feita a implementação do serviço da forma mais simples para que o teste passe ... que dê Green.
// Refactor - Etapa dedicada à refatorar o código.
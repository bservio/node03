import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Service', () => {

	it('should be able to authenticate', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateService(usersRepository) //sut means service under test ... deve representar a unidade principal que está em teste, nesse caso o AuthenticateService

		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('12345678',6)
		})

		const { user } = await sut.execute({
			email: 'johndoe@example.com',
			password: '12345678'
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateService(usersRepository) //sut means service under test ... deve representar a unidade principal que está em teste, nesse caso o AuthenticateService

		expect(() => sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateService(usersRepository) //sut means service under test ... deve representar a unidade principal que está em teste, nesse caso o AuthenticateService

		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('12345678', 6)
		})

		expect(() => sut.execute({
			email: 'johndoe@example.com',
			password: '12341234'
		}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

})
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepository } from '@/repositories/users-repository'

let usersRepository: UsersRepository
let sut: AuthenticateService
//sut = service under test

describe('Authenticate Service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateService(usersRepository)
	})

	it('should be able to authenticate', async () => {
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
		expect(() => sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
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
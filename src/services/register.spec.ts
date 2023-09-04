import { compare } from 'bcrypt'
import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
	it('should hash user password upon registration', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerService = new RegisterService(usersRepository) 

		const { user } = await registerService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with dupicated email', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const registerService = new RegisterService(usersRepository)

		const email = 'johndoe@example.com'

		await registerService.execute({
			name: 'John Doe',
			email,
			password: '12345678',
		})

		expect(async () => {
			return registerService.execute({
				name: 'John Doe',
				email,
				password: '12345678',
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
		
	})
})
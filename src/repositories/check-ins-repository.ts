import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
	findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
	findManybyUserId(userId: string, page: number): Promise<CheckIn[]>
	countByUserId(userId: string): Promise<number>
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
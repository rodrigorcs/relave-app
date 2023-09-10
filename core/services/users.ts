import { IUser } from '../../models/contracts/user'
import { usersRepository } from '../repositories/users'
import { uuid } from '../../utils/uuid'

export const usersService = {
  getUserByFirebaseId: usersRepository.getUserByFirebaseId,
  createUser: async (user: Omit<IUser, 'id'>) => {
    const newUser = { ...user, id: uuid() }
    const createdUser = await usersRepository.createUser(newUser)

    return createdUser
  }
}
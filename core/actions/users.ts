import { IUser } from "../../models/contracts/user"
import { usersRepository } from "../repositories/users"
import { usersService } from "../services/users"

export const usersActions = {
  getOrCreateUser: async (user: Omit<IUser, 'id'>) => {
    const existingUser = await usersRepository.getUserByFirebaseId(user.firebaseId)
    if (existingUser) return existingUser

    const createdUser = await usersService.createUser(user)
    return createdUser
  }
}
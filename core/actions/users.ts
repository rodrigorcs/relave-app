import { IUser } from "../../models/contracts/user"
import { usersRepository } from "../repositories/users"
import { usersService } from "../services/users"
import { uuid } from "../../utils/uuid"

export const usersActions = {
  getOrCreateUser: async (user: Omit<IUser, 'id'>) => {
    const existingUser = await usersRepository.getUserByFirebaseId(user.firebaseId)
    if (existingUser) return existingUser

    const newUser = { ...user, id: uuid() }
    const createdUser = await usersService.createUser(newUser)
    return createdUser
  }
}
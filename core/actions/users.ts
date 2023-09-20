import { IUser } from "../../models/contracts/user"
import { usersService } from "../services/users"

export const usersActions = {
  getOrCreateUser: async (user: Omit<IUser, 'id'>) => {
    const existingUser = await usersService.getUserByFirebaseId(user.firebaseId)
    if (existingUser) return existingUser

    const createdUser = await usersService.createUser(user)
    return createdUser
  },
  createStripeCustomer: async (userId: string, phoneNumber: string) => {
    const customer = await usersService.createStripeCustomer(userId, phoneNumber)

    return customer
  }
}
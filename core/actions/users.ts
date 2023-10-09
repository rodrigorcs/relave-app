import { ICreateUser, IUser } from "../../models/contracts/user"
import { usersService } from "../services/users"

export const usersActions = {
  getOrCreateUser: async (user: ICreateUser) => {
    const existingUser = await usersService.getUserByFirebaseId(user.firebaseId)
    if (existingUser) return existingUser

    const createdUser = await usersService.createUser(user)
    return createdUser
  },
  getOrCreateStripeCustomer: async (currentUser: IUser) => {
    if (currentUser.stripeId) return currentUser.stripeId

    const customerId = await usersService.createStripeCustomer(currentUser.id, currentUser.credentials.phoneNumber ?? '') as string

    return customerId
  }
}
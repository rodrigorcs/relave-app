import { AxiosResponse } from "axios"
import { Endpoints } from "../../models/constants/Endpoints"
import { ICreateCustomerRequestBody } from "../../models/contracts/internalApi/payment"
import { IUser } from "../../models/contracts/user"
import { httpClient } from "../../utils/httpClient"
import { usersRepository } from "../repositories/users"
import { usersService } from "../services/users"

export const usersActions = {
  getOrCreateUser: async (user: Omit<IUser, 'id'>) => {
    const existingUser = await usersRepository.getUserByFirebaseId(user.firebaseId)
    if (existingUser) return existingUser

    const createdUser = await usersService.createUser(user)
    return createdUser
  },
  createStripeCustomer: async (customerInternalId: string, phoneNumber: string) => {
    const { data: customer } = await httpClient.post<ICreateCustomerRequestBody, AxiosResponse<unknown>>(
      Endpoints.CREATE_STRIPE_CUSTOMER,
      {
        customerInternalId, phoneNumber
      },
    )

    return customer
  }
}
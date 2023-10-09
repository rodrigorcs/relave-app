import { ICreateUser } from '../../models/contracts/user'
import { usersRepository } from '../repositories/users'
import { uuid } from '../../utils/uuid'
import { httpClient } from '../../utils/httpClient'
import { AxiosResponse } from 'axios'
import { Endpoints } from '../../models/constants/Endpoints'
import { ICreateCustomerRequestBody } from '../../models/contracts/internalApi/payment'

export const usersService = {
  getUserByFirebaseId: usersRepository.getUserByFirebaseId,
  createUser: async (user: ICreateUser) => {
    const newUser = { ...user, id: uuid() }
    const createdUser = await usersRepository.createUser(newUser)

    return createdUser
  },
  createStripeCustomer: async (userId: string, phoneNumber: string) => {
    const { data: customer } = await httpClient.post<ICreateCustomerRequestBody, AxiosResponse<unknown>>(
      Endpoints.CREATE_STRIPE_CUSTOMER,
      {
        userId, phoneNumber
      },
    )

    return customer
  }
}
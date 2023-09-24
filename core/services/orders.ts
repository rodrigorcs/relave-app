import { ordersRepository } from '../repositories/orders'
import { uuid } from '../../utils/uuid'
import { IOrder } from '../../models/contracts/order'
import { generateShortId } from '../../utils/nanoid'

export const ordersService = {
  createOrder: async (userId: string, order: IOrder) => {
    const newOrder = { ...order, id: uuid(), shortId: generateShortId(8), userId }
    const createdOrder = await ordersRepository.createOrder(newOrder)

    return createdOrder
  },
}
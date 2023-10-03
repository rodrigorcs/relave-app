import { ordersRepository } from '../repositories/orders'
import { uuid } from '../../utils/uuid'
import { EOrderStatus, IOrder } from '../../models/contracts/order'
import { generateShortId } from '../../utils/nanoid'
import { EDateFormats, dayjs } from '../../utils/dayjs'

export const ordersService = {
  createOrder: async (userId: string, order: IOrder) => {
    const newOrder = {
      ...order,
      id: uuid(),
      shortId: generateShortId(8),
      dateId: dayjs(order.appointment.time).format(EDateFormats.DATE_ID),
      status: EOrderStatus.CREATED,
      userId
    }
    const createdOrder = await ordersRepository.createOrder(newOrder)

    return createdOrder
  },
}
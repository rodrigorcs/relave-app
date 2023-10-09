import { EOrderStatus, IOrder } from '../../models/contracts/order'
import { IOrderEntity } from '../../models/entities/order'
import { EDateFormats, dayjs } from '../../utils/dayjs'
import { generateShortId } from '../../utils/nanoid'
import { uuid } from '../../utils/uuid'
import { ordersRepository } from '../repositories/orders'

export const ordersService = {
  createOrder: async (userId: string, order: IOrder) => {
    const newOrder: IOrderEntity = {
      ...order,
      id: uuid(),
      shortId: generateShortId(8),
      dateId: dayjs.unix(order.appointment.time ?? 0).format(EDateFormats.DATE_ID),
      status: EOrderStatus.CREATED,
      plannedStart: order.appointment.time,
      duration: 90, // TODO: Use dynamic timing based on services
      userId,
    }
    const createdOrder = await ordersRepository.createOrder(newOrder)

    return createdOrder
  },
}

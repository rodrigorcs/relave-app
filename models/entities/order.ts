import { IOrder } from '../contracts/order'

export interface IOrderEntity extends IOrder {
  id: string
  userId: string
}

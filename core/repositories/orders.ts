import { EFirestoreCollections } from "../../models/constants/EFirestoreCollections"
import { IOrderEntity } from "../../models/entities/order"
import { firestore } from "../../utils/firebase"

const ordersCollection = firestore().collection(EFirestoreCollections.ORDERS)

export const ordersRepository = {
  createOrder: async (order: IOrderEntity) => {
    await ordersCollection.doc(order.id).set(order)

    return order
  }
}
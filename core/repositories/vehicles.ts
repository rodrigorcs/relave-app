import { EFirestoreCollections } from "../../models/constants/EFirestoreCollections"
import { IUser } from "../../models/contracts/user"
import { EVehicleKeys, IVehicle } from "../../models/contracts/vehicle"
import { firestore } from "../../utils/firebase"

const vehiclesCollection = firestore().collection(EFirestoreCollections.VEHICLES)

export const vehiclesRepository = {
  getVehiclesByUserId: async (userId: IUser['id']) => {
    const snapshot = await vehiclesCollection.where(EVehicleKeys.OWNER_ID, '==', userId).get()
    const vehicles = snapshot.docs.map((doc) => doc.data()) as IVehicle[]

    return vehicles
  },
  createVehicle: async (vehicle: IVehicle) => {
    await vehiclesCollection.doc(vehicle.id).set(vehicle)

    return vehicle
  }
}
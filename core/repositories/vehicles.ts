import { EFirestoreCollections } from "../../models/constants/EFirestoreCollections"
import { IVehicle } from "../../models/contracts/vehicle"
import { firestore } from "../../utils/firebase"

const vehiclesCollection = firestore().collection(EFirestoreCollections.VEHICLES)

export const vehiclesRepository = {
  createVehicle: async (vehicle: IVehicle) => {
    await vehiclesCollection.doc(vehicle.id).set(vehicle)

    return vehicle
  }
}
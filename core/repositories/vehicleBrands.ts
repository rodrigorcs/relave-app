import { EFirestoreCollections } from "../../models/constants/EFirestoreCollections"
import { IVehicleBrand } from "../../models/contracts/vehicleBrand"
import { firestore } from "../../utils/firebase"

const vehicleBrandsCollection = firestore().collection(EFirestoreCollections.VEHICLE_BRANDS)

export const vehicleBrandsRepository = {
  getVehiclesBrands: async () => {
    const snapshot = await vehicleBrandsCollection.get()
    const vehicleBrands = snapshot.docs.map((doc) => doc.data()) as IVehicleBrand[]

    return vehicleBrands
  },
}
import { EFirestoreCollections } from "../../models/constants/EFirestoreCollections"
import { IVehicleBrand } from "../../models/contracts/vehicleBrand"
import { EVehicleModelKeys, IVehicleModel } from "../../models/contracts/vehicleModel"
import { firestore } from "../../utils/firebase"

const vehicleModelsCollection = firestore().collection(EFirestoreCollections.VEHICLE_MODELS)

export const vehicleModelsRepository = {
  getVehicleModelsByBrandId: async (brandId: IVehicleBrand['id']) => {
    const snapshot = await vehicleModelsCollection.where(EVehicleModelKeys.BRAND_ID, '==', brandId).get()
    const vehicleModels = snapshot.docs.map((doc) => doc.data()) as IVehicleModel[]

    return vehicleModels
  },
}
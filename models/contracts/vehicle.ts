import { IUser } from "./user"
import { IVehicleBrand } from "./vehicleBrand"
import { IVehicleModel } from "./vehicleModel"

export interface IVehicle {
  id: string
  ownerId: IUser['id']
  brandId: IVehicleBrand['id']
  brandName: IVehicleBrand['name']
  brandSlug: IVehicleBrand['slug']
  modelId: IVehicleModel['id']
  modelName: IVehicleModel['name']
}

export enum EVehicleKeys {
  ID = 'id',
  OWNER_ID = 'ownerId',
  BRAND_ID = 'brandId',
  BRAND_NAME = 'brandName',
  BRAND_SLUG = 'brandSlug',
  MODEL_ID = 'modelId',
  MODEL_NAME = 'modelName',
} 
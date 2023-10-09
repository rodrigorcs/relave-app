import { IService } from './service'
import { IServiceBundleWithDetails } from './serviceBundle'
import { IVehicle } from './vehicle'

export interface ICart {
  vehicle: IVehicle | null
  serviceBundle: IServiceBundleWithDetails | null
  additionalServices: IService[]
  duration: number | null
}

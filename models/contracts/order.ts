import { TGoogleMapsPlaceResult } from "./externalApi/googleMaps"
import { IService } from "./service"
import { IServiceBundleWithDetails } from "./serviceBundle"
import { IVehicle } from "./vehicle"

export enum EPaymentLineTypes {
  SERVICE_BUNDLE = 'serviceBundle',
  ADDITIONAL_SERVICE = 'additionalService',
  SUBTOTAL = 'subtotal',
  DISCOUNT = 'discount',
  TOTAL = 'total',
}

export interface IPaymentLine {
  type: EPaymentLineTypes
  id: string
  name: string
  price: number
}

interface IAppointment {
  place: TGoogleMapsPlaceResult | null
  time: number | null
}

export interface IOrder {
  appointment: IAppointment
  vehicle: IVehicle | null
  serviceBundle: IServiceBundleWithDetails | null
  additionalServices: IService[]
  paymentLines: IPaymentLine[]
  totalPrice: number | null
}
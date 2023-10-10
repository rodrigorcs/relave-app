import { TGoogleMapsPlaceResult } from './externalApi/googleMaps'
import { IService } from './service'
import { IServiceBundleWithDetails } from './serviceBundle'
import { IVehicle } from './vehicle'

export enum EOrderStatus {
  NOT_CREATED = 'not-created',
  CREATED = 'created',
  PAID = 'paid',
}

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
  addressDetails: string | null
  time: number | null
}

interface IPayment {
  paymentIntentId: string
  customerId: string
  status: string
  totalPaid: number
  paidAt: number
  paymentMethodId: string
  lastDigits: string | null
  cardBrand: string | null
}

export interface IOrder {
  id: string | null
  shortId: string | null
  userId: string | null
  employeeId: string | null
  dateId: string | null
  status: string
  plannedStart: number | null
  duration: number | null
  appointment: IAppointment
  vehicle: IVehicle | null
  serviceBundle: IServiceBundleWithDetails | null
  additionalServices: IService[]
  paymentLines: IPaymentLine[]
  totalPrice: number | null
  payment: IPayment | null
}

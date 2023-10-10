import { ICart } from '../../models/contracts/cart'
import { EOrderStatus, EPaymentLineTypes, IOrder, IPaymentLine } from '../../models/contracts/order'
import { IOrderEntity } from '../../models/entities/order'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const calculateSumFromPaymentLines = (paymentLines: IPaymentLine[]): number => {
  return paymentLines.reduce((accumulator, paymentLine) => {
    return accumulator + paymentLine.price
  }, 0)
}

const cartToPaymentLines = ({
  serviceBundle,
  additionalServices,
}: Pick<ICart, 'serviceBundle' | 'additionalServices'>): IPaymentLine[] => {
  if (!serviceBundle) throw new Error('No service bundle selected.')

  const serviceBundlePaymentLine: IPaymentLine = {
    type: EPaymentLineTypes.SERVICE_BUNDLE,
    id: serviceBundle.id,
    name: serviceBundle.name,
    price: serviceBundle.price,
  }

  const additionalServicesPaymentLines: IPaymentLine[] = additionalServices.map((service) => ({
    type: EPaymentLineTypes.ADDITIONAL_SERVICE,
    id: service.id,
    name: service.name,
    price: service.price,
  }))

  const subtotal: IPaymentLine = {
    type: EPaymentLineTypes.SUBTOTAL,
    id: EPaymentLineTypes.SUBTOTAL,
    name: 'Subtotal',
    price: calculateSumFromPaymentLines([
      serviceBundlePaymentLine,
      ...additionalServicesPaymentLines,
    ]),
  }

  const discount: IPaymentLine = {
    type: EPaymentLineTypes.DISCOUNT,
    id: EPaymentLineTypes.DISCOUNT,
    name: 'Desconto',
    price: 0,
  }

  const total: IPaymentLine = {
    type: EPaymentLineTypes.TOTAL,
    id: EPaymentLineTypes.TOTAL,
    name: 'Total',
    price: calculateSumFromPaymentLines([subtotal, discount]),
  }

  return [serviceBundlePaymentLine, ...additionalServicesPaymentLines, subtotal, discount, total]
}

type TOrderState = IOrder

const initialState: TOrderState = {
  id: null,
  shortId: null,
  userId: null,
  employeeId: null,
  dateId: null,
  status: EOrderStatus.NOT_CREATED,
  plannedStart: null,
  duration: null,
  appointment: {
    place: null,
    time: null,
    addressDetails: null
  },
  vehicle: null,
  serviceBundle: null,
  additionalServices: [],
  paymentLines: [],
  totalPrice: null,
  payment: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAppointment: (state, action: PayloadAction<TOrderState['appointment']>) => {
      state.appointment.place = action.payload.place
      state.appointment.time = action.payload.time
      state.appointment.addressDetails = action.payload.addressDetails
    },
    setItemsFromCart: (
      state,
      action: PayloadAction<
        Pick<TOrderState, 'vehicle' | 'serviceBundle' | 'additionalServices' | 'duration'>
      >,
    ) => {
      const { vehicle, serviceBundle, additionalServices, duration } = action.payload
      const paymentLines = cartToPaymentLines({ serviceBundle, additionalServices })
      const totalPrice =
        paymentLines.find((paymentLine) => paymentLine.type === EPaymentLineTypes.TOTAL)?.price ??
        null

      state.vehicle = vehicle
      state.serviceBundle = serviceBundle
      state.additionalServices = additionalServices
      state.paymentLines = paymentLines
      state.totalPrice = totalPrice
      state.duration = duration
    },
    setOrderIds: (state, action: PayloadAction<Pick<TOrderState, 'id' | 'shortId'>>) => {
      state.id = action.payload.id
      state.shortId = action.payload.shortId
      state.status = EOrderStatus.CREATED
    },
    setPaymentFromDB: (state, action: PayloadAction<IOrderEntity['payment']>) => {
      state.payment = action.payload
      if (action.payload?.paidAt) state.status = EOrderStatus.PAID
    },
  },
})

export const { setAppointment, setItemsFromCart, setOrderIds, setPaymentFromDB } =
  orderSlice.actions

export const getAppointment = (state: TOrderState) => state.appointment
export const getPaymentLines = (state: TOrderState) => state.paymentLines
export const getTotalPrice = (state: TOrderState) => state.totalPrice
export const getPaymentData = (state: TOrderState) => state.payment
export const getOrder = (state: TOrderState) => state

export const orderReducer = orderSlice.reducer

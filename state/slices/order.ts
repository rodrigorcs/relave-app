import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps';
import { IVehicle } from '../../models/contracts/vehicle';
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle';
import { IService } from '../../models/contracts/service';

interface IAppointment {
  place: TGoogleMapsPlaceResult | null
  time: number | null
}

interface IOrderState {
  appointment: IAppointment
  vehicle: IVehicle | null
  serviceBundle: IServiceBundleWithDetails | null
  additionalServices: IService[]
}

const initialState: IOrderState = {
  appointment: {
    place: null,
    time: null
  },
  vehicle: null,
  serviceBundle: null,
  additionalServices: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointment.place = action.payload.place
      state.appointment.time = action.payload.time
    },
    setItemsFromCart: (state, action: PayloadAction<Pick<IOrderState, 'vehicle' | 'serviceBundle' | 'additionalServices'>>) => {
      state.vehicle = action.payload.vehicle
      state.serviceBundle = action.payload.serviceBundle
      state.additionalServices = action.payload.additionalServices
    }
  },
})

export const { setAppointment, setItemsFromCart } = orderSlice.actions

export const getAppointment = (state: IOrderState) => state.appointment
export const getServiceBundle = (state: IOrderState) => state.serviceBundle
export const getAdditionalServices = (state: IOrderState) => state.additionalServices

export const orderReducer = orderSlice.reducer

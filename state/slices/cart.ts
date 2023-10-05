import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IVehicle } from '../../models/contracts/vehicle';
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle';
import { ICart } from '../../models/contracts/cart';

type TCartState = ICart

const initialState: TCartState = {
  vehicle: null,
  serviceBundle: null,
  additionalServices: [],
  duration: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<IVehicle>) => {
      state.vehicle = action.payload
    },
    setSelectedServiceBundle: (state, action: PayloadAction<IServiceBundleWithDetails | null>) => {
      state.serviceBundle = action.payload
    },
    confirmSelectedServices: (state, action: PayloadAction<Pick<TCartState, 'additionalServices' | 'duration'>>) => {
      state.additionalServices = action.payload.additionalServices
      state.duration = action.payload.duration
    },
  },
})

export const { setSelectedVehicle, setSelectedServiceBundle, confirmSelectedServices } = cartSlice.actions

export const getSelectedVehicle = (state: TCartState) => state.vehicle

export const getSelectedServiceBundle = (state: TCartState) => state.serviceBundle

export const getSelectedAdditionalServices = (state: TCartState) => state.additionalServices

export const getCart = (state: TCartState) => state


export const cartReducer = cartSlice.reducer

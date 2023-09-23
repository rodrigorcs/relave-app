import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IVehicle } from '../../models/contracts/vehicle';
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle';
import { IService } from '../../models/contracts/service';
import { ICart } from '../../models/contracts/cart';

type TCartState = ICart

const initialState: TCartState = {
  vehicle: null,
  serviceBundle: null,
  additionalServices: []
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
    setSelectedAdditionalServices: (state, action: PayloadAction<IService[]>) => {
      state.additionalServices = action.payload
    },
  },
})

export const { setSelectedVehicle, setSelectedServiceBundle, setSelectedAdditionalServices } = cartSlice.actions

export const getSelectedVehicle = (state: TCartState) => state.vehicle

export const getSelectedServiceBundle = (state: TCartState) => state.serviceBundle

export const getSelectedAdditionalServices = (state: TCartState) => state.additionalServices

export const getCart = (state: TCartState) => state


export const cartReducer = cartSlice.reducer

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps';

interface IAppointment {
  place: TGoogleMapsPlaceResult | null
  time: number | null
}

interface IOrderState {
  appointment: IAppointment
}

const initialState: IOrderState = {
  appointment: {
    place: null,
    time: null
  }
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointment.place = action.payload.place
      state.appointment.time = action.payload.time
    },
  },
})

export const { setAppointment } = orderSlice.actions

export const getAppointment = (state: IOrderState) => state.appointment

export const orderReducer = orderSlice.reducer

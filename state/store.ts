import { authReducer } from './slices/auth'
import { cartReducer } from './slices/cart'
import { orderReducer } from './slices/order'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})

export type IAppState = ReturnType<typeof store.getState>

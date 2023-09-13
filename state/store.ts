import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { cartReducer } from './slices/cart';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type IAppState = ReturnType<typeof store.getState>;
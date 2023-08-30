import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type IAppState = ReturnType<typeof store.getState>;
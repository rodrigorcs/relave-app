import { authActions } from '../../core/actions/auth'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps'
import { IUser } from '../../models/contracts/user'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAuthState {
  user: IUser | null
  phoneNumberToSendOTP: string | null
  isUserSignedIn: boolean
}

const initialState: IAuthState = {
  user: null,
  phoneNumberToSendOTP: null,
  isUserSignedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isUserSignedIn = !!action.payload.id
    },
    clearCredentials: (state) => {
      state.user = null
      state.isUserSignedIn = false
    },
    storePhoneNumberToOTP: (state, action: PayloadAction<string>) => {
      state.phoneNumberToSendOTP = action.payload
    },
    storeName: (state, action: PayloadAction<string>) => {
      state.user = { ...state.user, name: action.payload } as IUser
    },
    storeLastAddress: (state, action: PayloadAction<TGoogleMapsPlaceResult>) => {
      state.user = { ...state.user, lastAddress: action.payload } as IUser
    },
  },
})

export const { storeUser, clearCredentials, storePhoneNumberToOTP, storeName, storeLastAddress } = authSlice.actions

// TODO: Alternative - Can't put into slice as it's not serializable
let smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult | null = null

export const storeConfirmationObj = (confirmationObj: FirebaseAuthTypes.ConfirmationResult) => {
  smsConfirmationObj = confirmationObj
}
export const getConfirmationObj = () => {
  return smsConfirmationObj
}

export const signOut = () => authActions.signOut()

export const getCurrentUser = (state: IAuthState) => state.user
export const getUserPhoneNumber = (state: IAuthState) => state.phoneNumberToSendOTP
export const getIsUserSignedIn = (state: IAuthState) => state.isUserSignedIn

export const authReducer = authSlice.reducer

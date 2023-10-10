import { authActions } from '../../core/actions/auth'
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
  },
})

export const { storeUser, clearCredentials, storePhoneNumberToOTP, storeName } = authSlice.actions

// TODO: Alternative - Can't put into slice as it's not serializable
let smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult | null = null

export const sendOTPToken = (phoneNumber: string) => async () => {
  const confirmation = await authActions.sendOTPToken(phoneNumber)
  smsConfirmationObj = confirmation
}

export const resendOTPToken = (phoneNumber: string) => async () => {
  const confirmation = await authActions.resendOTPToken(phoneNumber)
  smsConfirmationObj = confirmation
}

export const confirmOTPToken = (code: string) => async () => {
  if (smsConfirmationObj) await authActions.confirmOTPToken(smsConfirmationObj, code)
}

export const signOut = () => authActions.signOut()

export const getCurrentUser = (state: IAuthState) => state.user
export const getUserPhoneNumber = (state: IAuthState) => state.phoneNumberToSendOTP
export const getIsUserSignedIn = (state: IAuthState) => state.isUserSignedIn

export const authReducer = authSlice.reducer

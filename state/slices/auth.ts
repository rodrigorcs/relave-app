import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/contracts/user';
import { confirmOTPTokenAction, sendOTPTokenAction, signOutAction } from '../../actions/auth'

interface IAuthState {
  user: IUser | null
  isUserSignedIn: boolean
}

const initialState: IAuthState = {
  user: null,
  isUserSignedIn: false
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
  },
})

export const { storeUser, clearCredentials } = authSlice.actions

let smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult | null = null; // TODO: Alternative - Can't put into slice as it's not serializable

export const sendOTPToken = (phoneNumber: string) => async () => {
  const confirmation = await sendOTPTokenAction(phoneNumber)
  smsConfirmationObj = confirmation
}

export const confirmOTPToken = (code: string) => async () => {
  if (smsConfirmationObj) await confirmOTPTokenAction(smsConfirmationObj, code)
}

export const signOut = () => signOutAction()

export const getCurrentUser = (state: IAuthState) => state.user
export const getIsUserSignedIn = (state: IAuthState) => state.isUserSignedIn

export const authReducer = authSlice.reducer

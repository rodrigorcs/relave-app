import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'
import { IUser } from '../../models/contracts/user';

interface IAuthState {
  credentials: IUser | null
  isUserSignedIn: boolean
}

const initialState: IAuthState = {
  credentials: null,
  isUserSignedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeCredentials: (state, action: PayloadAction<IUser>) => {
      state.credentials = action.payload
      state.isUserSignedIn = !!action.payload.id
    },
    clearCredentials: (state) => {
      state.credentials = null
      state.isUserSignedIn = false
    },
  },
})

export const { storeCredentials, clearCredentials } = authSlice.actions

let smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult | null = null; // TODO: Alternative - Can't put into slice as it's not serializable

export const sendOTPToken = (phoneNumber: string) => async () => {
  const phoneToSignIn = `+55 ${phoneNumber}`
  const confirmation = await auth().signInWithPhoneNumber(phoneToSignIn)
  smsConfirmationObj = confirmation
}

export const confirmOTPToken = (code: string) => async () => {
  try {
    await smsConfirmationObj?.confirm(code)
  } catch (error) {
    // TODO: Add error handling
    console.error(error)
  }
}

export const signOut = () => auth().signOut()

export const getCurrentUser = (state: IAuthState) => state.credentials
export const getIsUserSignedIn = (state: IAuthState) => state.isUserSignedIn

export const authReducer = authSlice.reducer

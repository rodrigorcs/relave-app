import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'

interface IAuthState {
  credentials: FirebaseAuthTypes.UserCredential | null
}

const initialState: IAuthState = {
  credentials: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeCredentials: (state, action: PayloadAction<FirebaseAuthTypes.UserCredential>) => {
      state.credentials = action.payload
    },
  },
})

export const { storeCredentials } = authSlice.actions

let smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult | null = null; // TODO: Alternative - Can't put into slice as it's not serializable

export const sendOTPToken = (phoneNumber: string) => async () => {
  const phoneToSignIn = `+55 ${phoneNumber}`
  const confirmation = await auth().signInWithPhoneNumber(phoneToSignIn)
  smsConfirmationObj = confirmation
}

export const confirmOTPToken = (code: string) => async (dispatch: Dispatch) => {
  if (smsConfirmationObj === null) return console.error('No confirmation from OTP token sent')
  const credentials = await smsConfirmationObj.confirm(code)
  console.log('credentials', credentials)
  if (credentials) dispatch(storeCredentials(credentials))
}

export const authReducer = authSlice.reducer

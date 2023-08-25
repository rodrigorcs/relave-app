import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'

interface IAuthState {
  smsConfirmation: FirebaseAuthTypes.ConfirmationResult | null
}

const initialState: IAuthState = {
  smsConfirmation: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeSmsConfirmation: (state, action: PayloadAction<FirebaseAuthTypes.ConfirmationResult>) => {
      state.smsConfirmation = action.payload
    },
  },
})

export const { storeSmsConfirmation } = authSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const sendOTPToken = (phoneNumber: string) => async (dispatch: Dispatch) => {
  const phoneToSignIn = `+55 ${phoneNumber}`
  console.log('phoneToSignIn', phoneToSignIn)
  const confirmation = await auth().signInWithPhoneNumber(phoneToSignIn)
  dispatch(storeSmsConfirmation(confirmation))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getOTPConfirmation = (state: IAuthState) => state.smsConfirmation

export const authReducer = authSlice.reducer

import { auth } from '../../utils/firebase'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export const authActions = {
  sendOTPToken: async (phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> => {
    const phoneToSignIn = `+55 ${phoneNumber}`
    return auth().signInWithPhoneNumber(phoneToSignIn)
  },
  confirmOTPToken: async (
    smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult,
    code: string,
  ) => {
    return smsConfirmationObj?.confirm(code)
  },
  signOut: () => auth().signOut(),
}

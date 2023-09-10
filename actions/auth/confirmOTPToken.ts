import { FirebaseAuthTypes } from "@react-native-firebase/auth"

export const confirmOTPTokenAction = async (smsConfirmationObj: FirebaseAuthTypes.ConfirmationResult, code: string) => {
  return smsConfirmationObj?.confirm(code)
}
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export const sendOTPTokenAction = async (phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> => {
  const phoneToSignIn = `+55 ${phoneNumber}`;
  return auth().signInWithPhoneNumber(phoneToSignIn);
}
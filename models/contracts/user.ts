import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type IFirebaseUser = Pick<FirebaseAuthTypes.User,
  'displayName' |
  'email' |
  'emailVerified' |
  'isAnonymous' |
  'metadata' |
  'multiFactor' |
  'phoneNumber' |
  'photoURL' |
  'providerData' |
  'providerId' |
  'uid'>

export interface IUser extends Omit<IFirebaseUser, 'uid' | 'emailVerified'> {
  id: IFirebaseUser['uid']
  isEmailVerified: IFirebaseUser['emailVerified']
}
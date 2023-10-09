import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type IFirebaseUser = Pick<
  FirebaseAuthTypes.User,
  | 'email'
  | 'emailVerified'
  | 'isAnonymous'
  | 'metadata'
  | 'multiFactor'
  | 'phoneNumber'
  | 'photoURL'
  | 'providerData'
  | 'providerId'
  | 'uid'
>

export interface IUser {
  id: string
  name: string | null
  firebaseId: IFirebaseUser['uid']
  stripeId?: string
  credentials: {
    isAnonymous: IFirebaseUser['isAnonymous']
    metadata: IFirebaseUser['metadata']
    multiFactor: IFirebaseUser['multiFactor']
    phoneNumber: IFirebaseUser['phoneNumber']
    providerData: IFirebaseUser['providerData']
    providerId: IFirebaseUser['providerId']
  }
}

export interface ICreateUser extends Omit<IUser, 'id' | 'name'> {
  name: string | null
}

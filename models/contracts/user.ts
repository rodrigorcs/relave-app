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

export interface IUser {
  id: string
  firebaseId: IFirebaseUser['uid'],
  displayName: IFirebaseUser['displayName'],
  credentials: {
    isAnonymous: IFirebaseUser['isAnonymous'],
    metadata: IFirebaseUser['metadata'],
    multiFactor: IFirebaseUser['multiFactor'],
    phoneNumber: IFirebaseUser['phoneNumber'],
    providerData: IFirebaseUser['providerData'],
    providerId: IFirebaseUser['providerId'],
  },
}

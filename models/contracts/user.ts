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
  displayName: IFirebaseUser['displayName'],
  id: IFirebaseUser['uid'],
  credentials: {
    isAnonymous: IFirebaseUser['isAnonymous'],
    metadata: IFirebaseUser['metadata'],
    multiFactor: IFirebaseUser['multiFactor'],
    phoneNumber: IFirebaseUser['phoneNumber'],
    providerData: IFirebaseUser['providerData'],
    providerId: IFirebaseUser['providerId'],
  },
}

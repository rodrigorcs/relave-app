import auth from '@react-native-firebase/auth'

export const signOutAction = () => auth().signOut()
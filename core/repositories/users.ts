import { EFirestoreCollections } from '../../models/constants/EFirestoreCollections'
import { IUser } from '../../models/contracts/user'
import { firestore } from '../../utils/firebase'

const usersCollection = firestore().collection(EFirestoreCollections.USERS)

export const usersRepository = {
  getUserByFirebaseId: async (userFirebaseId: IUser['firebaseId']) => {
    const snapshot = await usersCollection.where('firebaseId', '==', userFirebaseId).get()
    const [existingUser] = snapshot.docs.map((doc) => doc.data()) as IUser[]

    return existingUser
  },
  createUser: async (user: IUser) => {
    await usersCollection.doc(user.id).set(user)

    return user
  },
  updateUser: async (id: IUser['id'], attributes: Partial<IUser>) => {
    await usersCollection.doc(id).set(attributes)

    return id
  },
}

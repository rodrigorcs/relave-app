import { EFirestoreCollections } from '../../models/constants/EFirestoreCollections'
import { IService } from '../../models/contracts/service'
import { firestore } from '../../utils/firebase'

const servicesCollection = firestore().collection(EFirestoreCollections.SERVICES)

export const servicesRepository = {
  getAllServices: async () => {
    const snapshot = await servicesCollection.get()
    const services = snapshot.docs.map((doc) => doc.data()) as IService[]

    return services
  },
}

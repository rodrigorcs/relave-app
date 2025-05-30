import { EFirestoreCollections } from '../../models/constants/EFirestoreCollections'
import { EServiceBundleKeys, IServiceBundle } from '../../models/contracts/serviceBundle'
import { firestore } from '../../utils/firebase'

const serviceBundlesCollection = firestore().collection(EFirestoreCollections.SERVICE_BUNDLES)

export const serviceBundlesRepository = {
  getAllServiceBundles: async () => {
    const snapshot = await serviceBundlesCollection.orderBy(EServiceBundleKeys.PRICE, 'asc').get()
    const serviceBundles = snapshot.docs.map((doc) => doc.data()) as IServiceBundle[]

    return serviceBundles
  },
}

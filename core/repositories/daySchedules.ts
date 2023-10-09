import { EFirestoreCollections } from '../../models/constants/EFirestoreCollections'
import { IDaySchedule } from '../../models/contracts/daySchedule'
import { firestore } from '../../utils/firebase'

const daySchedulesCollection = firestore().collection(EFirestoreCollections.DAY_SCHEDULES)

export const daySchedulesRepository = {
  getOneDaySchedule: async (id: string) => {
    const snapshot = await daySchedulesCollection.doc(id).get()
    const daySchedule = snapshot.data() as IDaySchedule

    return daySchedule
  },
}

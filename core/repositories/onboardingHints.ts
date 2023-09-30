import { EFirestoreCollections } from "../../models/constants/EFirestoreCollections"
import { IOnboardingHint } from "../../models/contracts/onboardingHint"
import { firestore } from "../../utils/firebase"

const onboardingHintsCollection = firestore().collection(EFirestoreCollections.ONBOARDING_HINTS)

export const onboardingHintsRepository = {
  getAll: async () => {
    const snapshot = await onboardingHintsCollection.get()
    const onboardingHints = snapshot.docs.map((doc) => doc.data()) as IOnboardingHint[]

    return onboardingHints
  },
}
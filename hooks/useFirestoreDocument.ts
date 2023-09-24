import { useEffect, useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { EFirestoreCollections } from '../models/constants/EFirestoreCollections';

export const useFirestoreDocument = <T>(
  collection: EFirestoreCollections,
  docId: string | null,
  onSnapshot: (documentData: T) => boolean  // Returns true to unsubscribe
) => {
  const [error, setError] = useState<Error | null>(null);

  const handleSuccess = useCallback(onSnapshot, []);

  useEffect(() => {
    if (!docId) return;

    const subscriber = firestore()
      .collection(collection)
      .doc(docId)
      .onSnapshot(
        (documentSnapshot) => {
          const documentData = documentSnapshot.data() as T;

          const unsubscribe = handleSuccess(documentData);
          if (unsubscribe) subscriber();
        },
        (error) => {
          setError(error);
        }
      );

    return () => subscriber();
  }, [collection, docId, handleSuccess]);

  return { error };
}
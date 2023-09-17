import { useState, useEffect } from 'react';
import { storage } from '../utils/firebase';

export const useCloudImage = (imageEndpoint: string): [string | null, boolean, unknown | null] => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _imageUrl = await storage()
          .ref(imageEndpoint)
          .getDownloadURL()
        setImageUrl(_imageUrl)
        if (_imageUrl === null) setError('Image does not exist')
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [imageUrl, loading, error];
};

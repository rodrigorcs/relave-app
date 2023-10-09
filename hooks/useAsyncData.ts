import { useState, useEffect } from 'react';

export const useAsyncData = <T>(action: (() => Promise<T>) | null, dependencies: unknown[] = [], resetWhenLoading?: boolean): [T | null, boolean, unknown | null] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (resetWhenLoading) setData(null)
      try {
        const result = action ? await action() : null
        setData(result);
      } catch (e) {
        console.error(e)
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return [data, loading, error];
};

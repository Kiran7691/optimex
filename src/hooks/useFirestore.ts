import { useState, useEffect } from 'react';
import { 
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { samplePRs, getAnalysisMetrics } from '../lib/sampleData';

export function useFirestore<T extends DocumentData>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot: QuerySnapshot = await getDocs(collection(db, collectionName));
        const documents = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as T[];
        setData(documents);
      } catch (err) {
        // If Firebase access fails, use sample data
        if (collectionName === 'pullRequests') {
          setData(samplePRs as unknown as T[]);
        } else if (collectionName === 'metrics') {
          setData([getAnalysisMetrics()] as unknown as T[]);
        } else {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
}
import { useState, useEffect } from 'react';
import { samplePRs, getAnalysisMetrics } from '../lib/sampleData';
import type { PullRequest, AnalysisMetrics } from '../types';

export function useData<T>(dataType: 'pullRequests' | 'metrics'): {
  data: T[];
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (dataType === 'pullRequests') {
          setData(samplePRs as T[]);
        } else if (dataType === 'metrics') {
          setData([getAnalysisMetrics()] as T[]);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err : new Error('Failed to load data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  return { data, loading, error };
}
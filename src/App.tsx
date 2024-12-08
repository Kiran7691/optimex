import React, { useState } from 'react';
import { PullRequest } from './types';
import { Header } from './components/Header';
import { MetricsGrid } from './components/MetricsGrid';
import { PRList } from './components/PRList';
import PRAnalysis from './components/analysis/PRAnalysis';
import { useFirestore } from './hooks/useFirestore';

function App() {
  const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);
  const { data: pullRequests, loading: prsLoading, error: prsError } = useFirestore<PullRequest>('pullRequests');
  const { data: metricsData, loading: metricsLoading, error: metricsError } = useFirestore('metrics');

  if (prsLoading || metricsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (prsError || metricsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
        Error loading data. Please try again later.
      </div>
    );
  }

  const metrics = metricsData[0] || {
    totalTests: 0,
    impactedTests: 0,
    averageConfidence: 0,
    executionDuration: 0
  };

  if (selectedPR) {
    return <PRAnalysis pr={selectedPR} onBack={() => setSelectedPR(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MetricsGrid metrics={metrics} />
        <PRList 
          pullRequests={pullRequests} 
          onSelectPR={setSelectedPR} 
        />
      </main>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BarChart3, GitPullRequest, Settings, Activity } from 'lucide-react';
import { PullRequest, AnalysisMetrics } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import Header from './Header';
import PRList from './PRList';
import MetricsCard from './MetricsCard';
import PRAnalysis from './analysis/PRAnalysis';

export default function Dashboard() {
  const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);
  const { 
    data: pullRequests, 
    loading: prsLoading,
    error: prsError,
    addDocument: addPR
  } = useFirestore<PullRequest>('pullRequests');

  const { 
    data: metricsData,
    loading: metricsLoading,
    error: metricsError 
  } = useFirestore<AnalysisMetrics>('metrics');

  const metrics = metricsData[0] || {
    totalTests: 0,
    impactedTests: 0,
    averageConfidence: 0,
    executionTime: 0
  };

  if (selectedPR) {
    return <PRAnalysis pr={selectedPR} onBack={() => setSelectedPR(null)} />;
  }

  if (prsLoading || metricsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-prizmora-purple border-t-transparent"></div>
      </div>
    );
  }

  if (prsError || metricsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Error loading data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total Tests"
            value={metrics.totalTests}
            icon={BarChart3}
            trend="+5%"
          />
          <MetricsCard
            title="Impacted Tests"
            value={metrics.impactedTests}
            icon={GitPullRequest}
            trend="-12%"
          />
          <MetricsCard
            title="Avg. Confidence"
            value={`${(metrics.averageConfidence * 100).toFixed(1)}%`}
            icon={Activity}
            trend="+2.5%"
          />
          <MetricsCard
            title="Execution Time"
            value={`${metrics.executionTime}s`}
            icon={Activity}
            trend="-8%"
          />
        </div>

        <div className="mt-8">
          <PRList pullRequests={pullRequests} onSelectPR={setSelectedPR} />
        </div>
      </main>
    </div>
  );
}
import React from 'react';
import { AnalysisMetrics } from '../types';
import { Activity, AlertCircle, Clock, Hash } from 'lucide-react';

interface MetricsGridProps {
  metrics: AnalysisMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center space-x-3">
          <Hash className="h-5 w-5 text-purple-600" />
          <h3 className="text-sm font-medium text-gray-500">Total Tests</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.totalTests}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-purple-600" />
          <h3 className="text-sm font-medium text-gray-500">Impacted Tests</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.impactedTests}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center space-x-3">
          <Activity className="h-5 w-5 text-purple-600" />
          <h3 className="text-sm font-medium text-gray-500">Avg. Confidence</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.averageConfidence}%</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-purple-600" />
          <h3 className="text-sm font-medium text-gray-500">Execution Time</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{Math.round(metrics.executionDuration / 1000)}s</p>
      </div>
    </div>
  );
}
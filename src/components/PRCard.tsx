import React from 'react';
import { PullRequest } from '../types';
import { GitPullRequest, Clock, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface PRCardProps {
  pr: PullRequest;
  onClick: () => void;
}

export function PRCard({ pr, onClick }: PRCardProps) {
  const getStatusIcon = () => {
    switch (pr.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'analyzing':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const passedTests = pr.testResults.filter(t => t.status === 'passed').length;
  const failedTests = pr.testResults.filter(t => t.status === 'failed').length;
  const flakyTests = pr.testResults.filter(t => t.status === 'flaky').length;

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <GitPullRequest className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">{pr.title}</h3>
        </div>
        {getStatusIcon()}
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="text-sm">
          <p className="text-gray-500">Total Impacted</p>
          <p className="font-semibold">{pr.impactedTests}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Passed</p>
          <p className="font-semibold text-green-600">{passedTests}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Failed</p>
          <p className="font-semibold text-red-600">{failedTests}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Flaky</p>
          <p className="font-semibold text-yellow-600">{flakyTests}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <span>By {pr.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(pr.timestamp).toLocaleDateString()}</span>
        </div>
        <button
          onClick={onClick}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
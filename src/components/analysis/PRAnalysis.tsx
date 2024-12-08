import React from 'react';
import { ArrowLeft, GitBranch, User, Clock } from 'lucide-react';
import { PullRequest } from '../../types';
import { Header } from '../Header';
import TestImpact from './TestImpact';
import TestMetrics from './TestMetrics';
import ChangedFiles from './ChangedFiles';
import TestAnalytics from './TestAnalytics';

interface PRAnalysisProps {
  pr: PullRequest;
  onBack: () => void;
}

export default function PRAnalysis({ pr, onBack }: PRAnalysisProps) {
  const passedTests = pr.testResults.filter(t => t.status === 'passed').length;
  const failedTests = pr.testResults.filter(t => t.status === 'failed').length;
  const flakyTests = pr.testResults.filter(t => t.status === 'flaky').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-8 animate-fade-in">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{pr.title}</h1>
                <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{pr.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <span>{pr.buildName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(pr.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 animate-slide-in">
            <div className="text-sm text-gray-500">Passed Tests</div>
            <div className="mt-2 text-3xl font-semibold text-green-600">{passedTests}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-sm text-gray-500">Failed Tests</div>
            <div className="mt-2 text-3xl font-semibold text-red-600">{failedTests}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-sm text-gray-500">Flaky Tests</div>
            <div className="mt-2 text-3xl font-semibold text-yellow-600">{flakyTests}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ChangedFiles files={pr.changedFiles} />
            <TestMetrics tests={pr.testResults} />
          </div>
          <div className="space-y-8">
            <TestImpact tests={pr.testResults} />
            <TestAnalytics tests={pr.testResults} />
          </div>
        </div>
      </main>
    </div>
  );
}
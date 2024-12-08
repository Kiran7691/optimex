import React from 'react';
import { TestResult } from '../../types';
import { LineChart, BarChart, Activity } from 'lucide-react';

interface TestMetricsProps {
  tests: TestResult[];
}

export default function TestMetrics({ tests }: TestMetricsProps) {
  const averageReliability = tests.reduce((acc, test) => acc + test.reliability, 0) / tests.length;
  const flakyTests = tests.filter((test) => test.status === 'flaky').length;
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Test Confidence Metrics</h2>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Reliability Score</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {averageReliability.toFixed(1)}%
              </p>
            </div>
            <Activity className="h-8 w-8 text-indigo-500" />
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Flaky Tests</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{flakyTests}</p>
            </div>
            <LineChart className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Coverage</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {(tests.reduce((acc, test) => acc + test.coverage, 0) / tests.length).toFixed(1)}%
              </p>
            </div>
            <BarChart className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
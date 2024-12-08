import React from 'react';
import { TestResult } from '../../types';

interface TestAnalyticsProps {
  tests: TestResult[];
}

export default function TestAnalytics({ tests }: TestAnalyticsProps) {
  const successRate = (test: TestResult) => {
    const passed = test.history.filter((h) => h.status === 'passed').length;
    return (passed / test.history.length) * 100;
  };

  const averageDuration = (test: TestResult) => {
    return test.history.reduce((acc, h) => acc + h.duration, 0) / test.history.length;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Test Analytics</h2>
      </div>
      <div className="p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Test
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Success Rate
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Avg Duration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tests.map((test) => (
              <tr key={test.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{test.name}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${successRate(test)}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {successRate(test).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {averageDuration(test).toFixed(0)}ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
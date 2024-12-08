import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock, Search, Filter } from 'lucide-react';
import { TestResult } from '../../types';

interface TestImpactProps {
  tests: TestResult[];
}

export default function TestImpact({ tests }: TestImpactProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TestResult['status'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'duration' | 'coverage'>('name');

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'flaky':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadgeColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'flaky':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredAndSortedTests = tests
    .filter((test) => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.path.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'duration':
          return b.duration - a.duration;
        case 'coverage':
          return b.coverage - a.coverage;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white rounded-lg shadow animate-fade-in">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Test Execution Details</h2>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-prizmora-purple focus:ring focus:ring-prizmora-light"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TestResult['status'] | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-prizmora-purple focus:ring focus:ring-prizmora-light"
            >
              <option value="all">All Status</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="flaky">Flaky</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'duration' | 'coverage')}
              className="rounded-md border-gray-300 shadow-sm focus:border-prizmora-purple focus:ring focus:ring-prizmora-light"
            >
              <option value="name">Sort by Name</option>
              <option value="duration">Sort by Duration</option>
              <option value="coverage">Sort by Coverage</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reliability
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Success
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedTests.map((test) => (
              <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{test.name}</div>
                    <div className="text-sm text-gray-500">{test.path}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(test.status)}`}>
                    {test.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {test.duration}ms
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-prizmora-purple h-2 rounded-full"
                        style={{ width: `${test.coverage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{test.coverage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${test.reliability}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{test.reliability}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(test.lastSuccess).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
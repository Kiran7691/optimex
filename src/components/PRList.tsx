import React from 'react';
import { PullRequest } from '../types';
import { PRCard } from './PRCard';

interface PRListProps {
  pullRequests: PullRequest[];
  onSelectPR: (pr: PullRequest) => void;
}

export function PRList({ pullRequests, onSelectPR }: PRListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Pull Requests</h2>
      <div className="grid gap-4">
        {pullRequests.map((pr) => (
          <PRCard key={pr.id} pr={pr} onClick={() => onSelectPR(pr)} />
        ))}
      </div>
    </div>
  );
}
export interface PullRequest {
  id: string;
  title: string;
  description: string;
  author: string;
  buildName: string;
  timestamp: string;
  status: 'open' | 'merged' | 'closed';
  testResults: TestResult[];
  changedFiles: ChangedFile[];
}

export interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'flaky' | 'not_executed';
  duration: number;
  coverage: number;
  lastRun: string;
  reliability: number;
}

export interface ChangedFile {
  path: string;
  changes: number;
  coverage: number;
  complexity: number;
  diff: string;
}
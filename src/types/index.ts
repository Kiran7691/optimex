export interface TestResult {
  id: string;
  name: string;
  path: string;
  status: 'passed' | 'failed' | 'flaky' | 'not_executed';
  duration: number;
  coverage: number;
  reliability: number;
  lastSuccess: string;
  dependencies: string[];
  history: Array<{
    timestamp: string;
    duration: number;
    status: 'passed' | 'failed' | 'flaky' | 'not_executed';
  }>;
}

export interface ChangedFile {
  path: string;
  changes: number;
  coverage: number;
  complexity: number;
  diff: string;
}

export interface PullRequest {
  id: string;
  title: string;
  status: 'completed' | 'analyzing' | 'failed' | 'pending';
  timestamp: string;
  impactedTests: number;
  confidence: number;
  author: string;
  branch: string;
  changedFiles: ChangedFile[];
  testResults: TestResult[];
}

export interface AnalysisMetrics {
  totalTests: number;
  impactedTests: number;
  averageConfidence: number;
  executionDuration: number;
}
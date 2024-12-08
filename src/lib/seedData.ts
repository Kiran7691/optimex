import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { PullRequest, AnalysisMetrics } from '../types';

const samplePRs: PullRequest[] = [
  {
    id: 'PR-123',
    title: 'Add User Authentication',
    author: 'Kiran CN',
    status: 'completed',
    timestamp: '2024-03-15T10:30:00Z',
    buildName: 'main-build-789',
    impactedTests: 15,
    testResults: [
      {
        id: 'test-1',
        name: 'User Login Flow',
        status: 'passed',
        duration: 1200,
        coverage: 85,
        lastRun: '2024-03-15T10:30:00Z',
        reliability: 98
      },
      // Add more test results as needed
    ],
    changedFiles: [
      {
        path: 'src/auth/AuthProvider.tsx',
        changes: 156,
        coverage: 87,
        complexity: 12,
        diff: '@@ -1,4 +1,4 @@\n-import { createContext } from \'react\';\n+import { createContext, useContext } from \'react\';\n\nexport const AuthContext = createContext({\n  user: null,'
      }
    ]
  }
];

const metrics: AnalysisMetrics = {
  totalTests: 156,
  impactedTests: 23,
  averageConfidence: 87,
  executionDuration: 45600
};

export async function seedSampleData() {
  try {
    // Check if data already exists
    const prsQuery = query(collection(db, 'pullRequests'), where('id', '==', 'PR-123'));
    const snapshot = await getDocs(prsQuery);
    
    if (!snapshot.empty) {
      console.log('Sample data already exists');
      return;
    }

    // Add pull requests
    for (const pr of samplePRs) {
      await addDoc(collection(db, 'pullRequests'), pr);
    }

    // Add metrics
    await addDoc(collection(db, 'metrics'), metrics);

    console.log('Sample data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}
import { AnalysisMetrics, PullRequest } from '../types';

const authTestNames = [
  'User Login Flow',
  'Password Reset Process',
  'OAuth Integration',
  'Session Management',
  'Token Validation',
  'User Registration',
  'Email Verification',
  'Two-Factor Authentication',
  'Social Login Integration',
  'Remember Me Functionality',
  'Account Lockout',
  'Password Strength Validation',
  'JWT Token Refresh',
  'Role-based Authorization',
  'API Authentication'
];

const profileTestNames = [
  'Profile Data Loading',
  'Avatar Upload',
  'Profile Information Update',
  'Privacy Settings',
  'Notification Preferences',
  'Account Deletion',
  'Password Change',
  'Connected Accounts'
];

const settingsTestNames = [
  'Theme Preferences',
  'Language Selection',
  'Email Notifications',
  'Security Settings',
  'Data Export',
  'Account Recovery Options',
  'API Key Management',
  'Two-Factor Settings',
  'Device Management',
  'Billing Information',
  'Subscription Management',
  'Usage Analytics'
];

export const samplePRs: PullRequest[] = [
  {
    id: 'PR-123',
    title: 'Add User Authentication',
    author: 'Kiran CN',
    status: 'completed',
    timestamp: '2024-03-15T10:30:00Z',
    buildName: 'main-build-789',
    impactedTests: 15,
    changedFiles: [
      {
        path: 'src/auth/AuthProvider.tsx',
        changes: 156,
        coverage: 87,
        complexity: 12,
        diff: `@@ -1,4 +1,4 @@
-import { createContext } from 'react';
+import { createContext, useContext } from 'react';
 
 export const AuthContext = createContext({
   user: null,`
      },
      {
        path: 'src/components/LoginForm.tsx',
        changes: 89,
        coverage: 92,
        complexity: 8,
        diff: `@@ -1,3 +1,3 @@
-function LoginForm() {
+export function LoginForm() {
   const [email, setEmail] = useState('');`
      }
    ],
    testResults: authTestNames.map((name, i) => ({
      id: `test-${i + 1}`,
      name,
      path: `tests/auth/${name.toLowerCase().replace(/\s+/g, '-')}.test.ts`,
      status: i < 12 ? 'passed' : i < 14 ? 'failed' : 'flaky',
      duration: Math.random() * 1000 + 500,
      coverage: Math.round(Math.random() * 40 + 60),
      reliability: Math.round(Math.random() * 30 + 70),
      lastSuccess: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      dependencies: ['src/auth/AuthProvider.tsx', 'src/components/LoginForm.tsx'],
      history: Array.from({ length: 10 }, () => ({
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        duration: Math.random() * 1000 + 500,
        status: Math.random() > 0.2 ? 'passed' : Math.random() > 0.5 ? 'failed' : 'flaky'
      }))
    }))
  },
  {
    id: 'PR-124',
    title: 'Implement User Profile',
    author: 'Kiran CN',
    status: 'analyzing',
    timestamp: '2024-03-16T09:15:00Z',
    buildName: 'main-build-790',
    impactedTests: 8,
    changedFiles: [
      {
        path: 'src/components/Profile.tsx',
        changes: 234,
        coverage: 78,
        complexity: 15,
        diff: `@@ -1,3 +1,3 @@
-const Profile = () => {
+export const Profile: React.FC = () => {
   const [userData, setUserData] = useState(null);`
      }
    ],
    testResults: profileTestNames.map((name, i) => ({
      id: `test-${i + 1}`,
      name,
      path: `tests/profile/${name.toLowerCase().replace(/\s+/g, '-')}.test.ts`,
      status: i < 6 ? 'passed' : i < 7 ? 'failed' : 'flaky',
      duration: Math.random() * 1000 + 500,
      coverage: Math.round(Math.random() * 40 + 60),
      reliability: Math.round(Math.random() * 30 + 70),
      lastSuccess: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      dependencies: ['src/components/Profile.tsx'],
      history: Array.from({ length: 10 }, () => ({
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        duration: Math.random() * 1000 + 500,
        status: Math.random() > 0.2 ? 'passed' : Math.random() > 0.5 ? 'failed' : 'flaky'
      }))
    }))
  },
  {
    id: 'PR-125',
    title: 'Add Settings Page',
    author: 'Kiran CN',
    status: 'completed',
    timestamp: '2024-03-17T14:20:00Z',
    buildName: 'main-build-791',
    impactedTests: 12,
    changedFiles: [
      {
        path: 'src/pages/Settings.tsx',
        changes: 189,
        coverage: 85,
        complexity: 10,
        diff: `@@ -1,3 +1,3 @@
-function Settings() {
+export function Settings() {
   const [preferences, setPreferences] = useState({});`
      }
    ],
    testResults: settingsTestNames.map((name, i) => ({
      id: `test-${i + 1}`,
      name,
      path: `tests/settings/${name.toLowerCase().replace(/\s+/g, '-')}.test.ts`,
      status: i < 9 ? 'passed' : i < 11 ? 'failed' : 'flaky',
      duration: Math.random() * 1000 + 500,
      coverage: Math.round(Math.random() * 40 + 60),
      reliability: Math.round(Math.random() * 30 + 70),
      lastSuccess: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      dependencies: ['src/pages/Settings.tsx'],
      history: Array.from({ length: 10 }, () => ({
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        duration: Math.random() * 1000 + 500,
        status: Math.random() > 0.2 ? 'passed' : Math.random() > 0.5 ? 'failed' : 'flaky'
      }))
    }))
  }
];

export function getAnalysisMetrics(): AnalysisMetrics {
  return {
    totalTests: 156,
    impactedTests: 23,
    averageConfidence: 87,
    executionDuration: 45600
  };
}
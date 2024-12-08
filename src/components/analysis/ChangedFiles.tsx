import React from 'react';
import { File, GitCommit } from 'lucide-react';
import { ChangedFile } from '../../types';

interface ChangedFilesProps {
  files: ChangedFile[];
}

export default function ChangedFiles({ files }: ChangedFilesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Changed Files</h2>
      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.path} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <File className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-900">{file.path}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-1">
                  <GitCommit className="h-4 w-4 text-gray-500" />
                  <span>{file.changes} changes</span>
                </span>
                <span className="text-gray-500">
                  Coverage: {file.coverage}%
                </span>
                <span className="text-gray-500">
                  Complexity: {file.complexity}
                </span>
              </div>
            </div>
            <pre className="bg-gray-50 rounded p-3 text-sm overflow-x-auto">
              {file.diff}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
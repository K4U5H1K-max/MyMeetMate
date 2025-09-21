import React from 'react';

interface Props {
  onExport: (type: 'notion' | 'slack' | 'email') => void;
  loading: boolean;
}

const ExportPanel: React.FC<Props> = ({ onExport, loading }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-start">
    <h2 className="text-lg font-semibold mb-2">Export Recap</h2>
    <div className="flex space-x-2">
      <button
        onClick={() => onExport('notion')}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        disabled={loading}
      >
        Notion
      </button>
      <button
        onClick={() => onExport('slack')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        Slack
      </button>
      <button
        onClick={() => onExport('email')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50"
        disabled={loading}
      >
        Email
      </button>
    </div>
  </div>
);

export default ExportPanel;

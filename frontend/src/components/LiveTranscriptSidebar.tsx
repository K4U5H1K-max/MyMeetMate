import React from 'react';

interface Props {
  transcript: string[];
}

const LiveTranscriptSidebar: React.FC<Props> = ({ transcript }) => (
  <aside className="w-80 h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700">
    <h2 className="text-lg font-semibold mb-2">Live Transcript</h2>
    <div className="space-y-2">
      {transcript.map((line, idx) => (
        <div key={idx} className="text-sm text-gray-700 dark:text-gray-200">{line}</div>
      ))}
    </div>
  </aside>
);

export default LiveTranscriptSidebar;

import React from 'react';

interface MoodPoint {
  time: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface Props {
  timeline: MoodPoint[];
}

const sentimentColor = {
  positive: 'bg-green-400',
  neutral: 'bg-gray-400',
  negative: 'bg-red-400',
};

const MoodTimeline: React.FC<Props> = ({ timeline }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-2">Mood Timeline</h2>
    <div className="flex items-center space-x-2">
      {timeline.map((point, idx) => (
        <div key={idx} className={`w-4 h-4 rounded-full ${sentimentColor[point.sentiment]}`} title={`${point.time}: ${point.sentiment}`}></div>
      ))}
    </div>
  </div>
);

export default MoodTimeline;

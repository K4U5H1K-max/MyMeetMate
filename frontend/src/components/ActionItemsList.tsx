import React from 'react';

interface ActionItem {
  description: string;
  assignee?: string;
  completed: boolean;
}

interface Props {
  items: ActionItem[];
  onToggle: (index: number) => void;
}

const ActionItemsList: React.FC<Props> = ({ items, onToggle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 className="text-lg font-semibold mb-2">Action Items</h2>
    <ul>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(idx)}
            className="mr-2 accent-blue-500"
          />
          <span className={item.completed ? 'line-through text-gray-400' : ''}>
            {item.description} {item.assignee && <span className="text-xs text-blue-500 ml-2">@{item.assignee}</span>}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActionItemsList;

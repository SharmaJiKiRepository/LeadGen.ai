import React from 'react';

const ProgressBar = ({ label, value, current, total, unit }) => {
  // Ensure value is a number between 0 and 100
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-1 flex items-end justify-between">
        <span className="text-base font-medium text-gray-800">{label}</span>
        <span className="text-sm font-medium text-gray-500">
          {`${current.toLocaleString()} / ${total.toLocaleString()} ${unit}`}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full bg-primary"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
       <div className="mt-1 text-right">
             <span className="text-sm font-medium text-gray-500">{percentage.toFixed(1)}% used</span>
       </div>
    </div>
  );
};

export default ProgressBar;
// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ percent = 0, value }) {
  // Allow either 'percent' or 'value' as props for flexibility
  const v = typeof percent === "number" ? percent : value || 0;

  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(v, 0), 100)}%` }}
      />
    </div>
  );
}

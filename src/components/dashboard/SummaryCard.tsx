import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  className?: string;
}

const SummaryCard: React.FC<CardProps> = ({ title, value, className }) => (
  <div className={`bg-white rounded-lg shadow p-4 flex flex-col items-center ${className || ''}`}>
    <div className="text-lg font-semibold text-gray-700 mb-1">{title}</div>
    <div className="text-2xl font-bold text-blue-600">{value}</div>
  </div>
);

export default SummaryCard;

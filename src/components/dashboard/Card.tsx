import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, className }) => (
  <div className={`bg-white rounded-xl shadow flex flex-col items-center p-5 ${className || ''}`}>
    {icon && <div className="mb-2 text-3xl text-blue-500">{icon}</div>}
    <div className="text-lg font-medium text-gray-600">{title}</div>
    <div className="text-2xl font-bold text-blue-900 mt-1">{value}</div>
  </div>
);

export default Card;

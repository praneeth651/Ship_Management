import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<LucideIcon>;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3 text-blue-600">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-xl font-semibold text-gray-900">{value}</div>
            </dd>
            {change && (
              <dd className="flex items-center mt-1">
                <span className={`text-sm font-medium ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {change.positive ? '+' : ''}{change.value}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
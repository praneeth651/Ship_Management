import React from 'react';

type StatusType = 'overdue' | 'scheduled' | 'in-progress' | 'completed' | 'warning' | 'operational';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (): string => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'operational':
        return 'Operational';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()} ${className}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
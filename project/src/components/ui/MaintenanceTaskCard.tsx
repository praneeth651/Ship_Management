import React from 'react';
import { AlertTriangle, Calendar, Clock, Ship, User } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { MaintenanceTask } from '../../types';

interface MaintenanceTaskCardProps {
  task: MaintenanceTask;
}

const MaintenanceTaskCard: React.FC<MaintenanceTaskCardProps> = ({ task }) => {
  const isPastDue = new Date(task.dueDate) < new Date();
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <div className={`p-2 rounded-md mr-3 ${
            task.priority === 'high' ? 'bg-red-100 text-red-600' : 
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
            'bg-blue-100 text-blue-600'
          }`}>
            <AlertTriangle size={16} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{task.title}</h3>
            <p className="text-sm text-gray-500">Task #{task.id.substring(0, 6)}</p>
          </div>
        </div>
        <StatusBadge status={task.status} />
      </div>
      
      <div className="px-4 py-3">
        <p className="text-sm text-gray-600 mb-4">{task.description}</p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <Ship size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">{task.shipName}</span>
          </div>
          <div className="flex items-center">
            <User size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">{task.assignedTo}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className={`${isPastDue && task.status !== 'completed' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {getFormattedDate(task.dueDate)}
            </span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">{task.estimatedHours} hours</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2">
          Reschedule
        </button>
        <button className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {task.status === 'completed' ? 'View Details' : 'Update Status'}
        </button>
      </div>
    </div>
  );
};

export default MaintenanceTaskCard;
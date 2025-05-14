import React, { useState } from 'react';
import { AlertTriangle, Calendar, Clock, Ship, User, Edit, CheckCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import RescheduleModal from './RescheduleModal';
import StatusUpdateModal from './StatusUpdateModal';
import TaskDetailsModal from './TaskDetailsModal';
import { MaintenanceTask } from '../../types';
import { useTaskStore } from '../../stores/taskStore';

interface MaintenanceTaskCardProps {
  task: MaintenanceTask;
}

const MaintenanceTaskCard: React.FC<MaintenanceTaskCardProps> = ({ task }) => {
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const rescheduleTask = useTaskStore((state) => state.rescheduleTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const isPastDue = new Date(task.dueDate) < new Date();

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleReschedule = (taskId: string, newDueDate: string) => {
    rescheduleTask(taskId, newDueDate);
  };

  const handleUpdateStatus = (taskId: string, newStatus: MaintenanceTask['status']) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <>
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
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <Ship size={16} className="text-gray-400 mr-2 flex-shrink-0" />
              <span className="text-gray-600 truncate">{task.shipName}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="text-gray-400 mr-2 flex-shrink-0" />
              <span className="text-gray-600 truncate">{task.assignedTo}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-400 mr-2 flex-shrink-0" />
              <span className={`${isPastDue && task.status !== 'completed' ? 'text-red-600 font-medium' : 'text-gray-600'} truncate`}>
                {getFormattedDate(task.dueDate)}
              </span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="text-gray-400 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{task.estimatedHours} hours</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end flex-wrap gap-2">
          {task.status !== 'completed' && (
            <button
              onClick={() => setIsRescheduleModalOpen(true)}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Calendar size={16} className="mr-1.5" />
              <span className="hidden sm:inline">Reschedule</span>
            </button>
          )}

          <button
            onClick={() => task.status === 'completed' ? setIsDetailsModalOpen(true) : setIsStatusModalOpen(true)}
            className={`px-3 py-1.5 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${
              task.status === 'completed'
                ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'bg-blue-600 border-transparent text-white hover:bg-blue-700'
            }`}
          >
            {task.status === 'completed' ? (
              <>
                <CheckCircle size={16} className="mr-1.5" />
                <span className="hidden sm:inline">View Details</span>
              </>
            ) : (
              <>
                <Edit size={16} className="mr-1.5" />
                <span className="hidden sm:inline">Update Status</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modals */}
      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onReschedule={handleReschedule}
        task={task}
      />

      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        task={task}
      />

      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default MaintenanceTaskCard;
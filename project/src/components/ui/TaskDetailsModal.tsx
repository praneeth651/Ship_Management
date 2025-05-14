import React from 'react';
import { X, AlertTriangle, Calendar, Clock, Ship, User, CheckCircle, FileText } from 'lucide-react';
import { MaintenanceTask } from '../../types';
import StatusBadge from './StatusBadge';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: MaintenanceTask;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  task 
}) => {
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Task Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">Task #{task.id.substring(0, 8)}</p>
            </div>
            <StatusBadge status={task.status} />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FileText size={16} className="mr-2 text-gray-500" />
              Description
            </h4>
            <p className="text-gray-700">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Task Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Ship size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Ship</p>
                    <p className="text-sm font-medium text-gray-800">{task.shipName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Assigned To</p>
                    <p className="text-sm font-medium text-gray-800">{task.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <AlertTriangle size={18} className={`mr-3 ${
                    task.priority === 'high' ? 'text-red-500' : 
                    task.priority === 'medium' ? 'text-yellow-500' : 
                    'text-blue-500'
                  }`} />
                  <div>
                    <p className="text-xs text-gray-500">Priority</p>
                    <p className="text-sm font-medium text-gray-800 capitalize">{task.priority}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Schedule Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="text-sm font-medium text-gray-800">{getFormattedDate(task.dueDate)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-500">Estimated Hours</p>
                    <p className="text-sm font-medium text-gray-800">{task.estimatedHours} hours</p>
                  </div>
                </div>
                {task.status === 'completed' && (
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Completed On</p>
                      <p className="text-sm font-medium text-gray-800">{getFormattedDate(new Date().toISOString())}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {task.status === 'completed' && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-start">
                <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800 mb-1">Task Completed</h4>
                  <p className="text-sm text-green-700">
                    This maintenance task has been successfully completed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;

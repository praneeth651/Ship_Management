import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MaintenanceTask } from '../../types';
import StatusBadge from './StatusBadge';

interface StatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (taskId: string, newStatus: MaintenanceTask['status']) => void;
  task: MaintenanceTask;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpdateStatus, 
  task 
}) => {
  const [status, setStatus] = useState<MaintenanceTask['status']>(task.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(task.id, status);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Task Status
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
            <div className="flex items-center">
              <p className="text-sm text-gray-500 mr-2">Current status:</p>
              <StatusBadge status={task.status} />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              New Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as MaintenanceTask['status'])}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;

import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { MaintenanceTask } from '../../types';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (taskId: string, newDueDate: string) => void;
  task: MaintenanceTask;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ 
  isOpen, 
  onClose, 
  onReschedule, 
  task 
}) => {
  const [dueDate, setDueDate] = useState<string>(task.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReschedule(task.id, dueDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Reschedule Task
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
            <p className="text-sm text-gray-500">Ship: {task.shipName}</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              New Due Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Current due date: {new Date(task.dueDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
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
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;

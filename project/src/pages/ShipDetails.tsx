import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Ship, PenTool as Tool, User } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';
import MaintenanceTaskCard from '../components/ui/MaintenanceTaskCard';
import TaskModal from '../components/ui/TaskModal';
import { useShipStore } from '../stores/shipStore';
import { useTaskStore } from '../stores/taskStore';
import { MaintenanceTask } from '../types';

const ShipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ships = useShipStore((state) => state.ships);
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Find the ship with the matching ID
  const ship = ships.find((s) => s.id === id);

  // Filter tasks related to this ship
  const shipTasks = tasks.filter((task) => task.shipId === id);

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleSaveTask = (taskData: Omit<MaintenanceTask, 'id'>) => {
    addTask(taskData);
  };

  if (!ship) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Ship size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">Ship Not Found</h2>
        <p className="text-gray-500 mb-4">The ship you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/ships"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft size={16} className="mr-2" />
          Return to Ship Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <Link
          to="/ships"
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{ship.name}</h1>
          <p className="text-sm text-gray-500">{ship.type} • {ship.year}</p>
        </div>
      </div>

      {/* Ship details card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 h-40 relative">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute bottom-4 left-6 flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Ship size={32} className="text-blue-600" />
            </div>
            <div className="ml-4 text-white">
              <h2 className="text-2xl font-bold">{ship.name}</h2>
              <div className="flex items-center mt-1">
                <span className="text-blue-100">{ship.type}</span>
                <span className="mx-2 text-blue-300">•</span>
                <span className="text-blue-100">Built {ship.year}</span>
                <span className="mx-2 text-blue-300">•</span>
                <StatusBadge status={ship.status === 'operational' ? 'completed' : ship.status} className="bg-opacity-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Inspection</h3>
                  <p className="text-lg font-semibold text-gray-900">{ship.lastInspection}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-md text-green-600">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Next Maintenance</h3>
                  <p className="text-lg font-semibold text-gray-900">{ship.nextMaintenance}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-md text-yellow-600">
                  <Tool size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
                  <p className="text-lg font-semibold text-gray-900">{ship.pendingTasks}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-md text-purple-600">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Captain</h3>
                  <p className="text-lg font-semibold text-gray-900">{ship.captain || 'Not assigned'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ship details tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Task actions */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Maintenance Tasks</h3>
            <div className="flex space-x-3">
              <button
                onClick={handleOpenTaskModal}
                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Tool size={16} className="mr-2" />
                New Task
              </button>
            </div>
          </div>

          {/* Tasks list */}
          {shipTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {shipTasks.map((task) => (
                <MaintenanceTaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <Tool size={40} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No maintenance tasks</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                This ship doesn't have any maintenance tasks scheduled yet. Create a new task to get started.
              </p>
              <button
                onClick={handleOpenTaskModal}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Tool size={16} className="mr-2" />
                Create New Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {ship && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={handleCloseTaskModal}
          onSave={handleSaveTask}
          editTask={undefined}
        />
      )}
    </div>
  );
};

export default ShipDetails;
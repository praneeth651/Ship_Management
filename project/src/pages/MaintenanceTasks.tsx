import React, { useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import MaintenanceTaskCard from '../components/ui/MaintenanceTaskCard';
import TaskModal from '../components/ui/TaskModal';
import { useTaskStore } from '../stores/taskStore';
import { MaintenanceTask } from '../types';

const MaintenanceTasks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<MaintenanceTask | undefined>(undefined);

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.shipName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleOpenTaskModal = () => {
    setEditingTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  const handleSaveTask = (taskData: Omit<MaintenanceTask, 'id'>) => {
    addTask(taskData);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track all maintenance activities</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleOpenTaskModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Create Task
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="relative sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-400 mr-2" />
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 mr-2">
                Status:
              </label>
              <select
                id="status-filter"
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="flex items-center">
              <label htmlFor="priority-filter" className="text-sm font-medium text-gray-700 mr-2">
                Priority:
              </label>
              <select
                id="priority-filter"
                className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredTasks.map((task) => (
            <MaintenanceTaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
            <Search size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
          <p className="text-gray-500">
            {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Create a task to get started with your maintenance tracking'}
          </p>
          <button
            onClick={handleOpenTaskModal}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-2" />
            Create Task
          </button>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSave={handleSaveTask}
        editTask={editingTask}
      />
    </div>
  );
};

export default MaintenanceTasks;
import React from 'react';
import { AlertCircle, BarChart2, Calendar, Ship, PenTool as Tool, TrendingDown, TrendingUp } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { useShipStore } from '../stores/shipStore';
import { useTaskStore } from '../stores/taskStore';

const Dashboard: React.FC = () => {
  const ships = useShipStore((state) => state.ships);
  const tasks = useTaskStore((state) => state.tasks);

  // Filter tasks for upcoming and overdue sections
  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed' && new Date(task.dueDate) >= new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
    
  const overdueTasks = tasks
    .filter(task => task.status !== 'completed' && new Date(task.dueDate) < new Date())
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of fleet maintenance status</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Ships" 
          value={ships.length} 
          icon={<Ship size={20} />}
          change={{ value: "2", positive: true }}
        />
        <StatCard 
          title="Active Tasks" 
          value={tasks.filter(t => t.status !== 'completed').length} 
          icon={<Tool size={20} />}
          change={{ value: "5", positive: true }}
        />
        <StatCard 
          title="Overdue Tasks" 
          value={overdueTasks.length} 
          icon={<AlertCircle size={20} />}
          change={{ value: "3", positive: false }}
        />
        <StatCard 
          title="Scheduled This Week" 
          value={8} 
          icon={<Calendar size={20} />}
        />
      </div>
      
      {/* Fleet Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Fleet Status</h2>
            <div className="flex items-center">
              <BarChart2 size={18} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">Last updated: Today, 09:41 AM</span>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-5">
          <div className="flex flex-wrap -m-2">
            {['operational', 'maintenance', 'inspection', 'repair'].map((category, idx) => (
              <div key={idx} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase">{category}</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {Math.floor(Math.random() * 10) + 1}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    {Math.random() > 0.5 ? (
                      <>
                        <TrendingUp size={16} className="text-green-500 mr-1" />
                        <span className="text-green-600 font-medium">+{Math.floor(Math.random() * 20)}%</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown size={16} className="text-red-500 mr-1" />
                        <span className="text-red-600 font-medium">-{Math.floor(Math.random() * 20)}%</span>
                      </>
                    )}
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tasks sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-medium text-gray-900">Upcoming Tasks</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <Ship size={14} className="mr-1" />
                      <span>{task.shipName} • </span>
                      <span className="ml-1">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StatusBadge status={task.status} />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                <p>No upcoming tasks</p>
              </div>
            )}
          </div>
          
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <a href="/tasks" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all tasks
            </a>
          </div>
        </div>
        
        {/* Overdue tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
            <div className="flex items-center">
              <AlertCircle size={18} className="text-red-500 mr-2" />
              <h2 className="text-base font-medium text-gray-900">Overdue Tasks</h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {overdueTasks.length > 0 ? (
              overdueTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <Ship size={14} className="mr-1" />
                      <span>{task.shipName} • </span>
                      <span className="ml-1 text-red-600 font-medium">
                        Overdue: {Math.ceil((new Date().getTime() - new Date(task.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StatusBadge status="overdue" />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">No overdue tasks</p>
                <p className="text-sm text-gray-500 mt-1">All maintenance tasks are on schedule</p>
              </div>
            )}
          </div>
          
          {overdueTasks.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <a href="/tasks" className="text-sm font-medium text-red-600 hover:text-red-500">
                View all overdue tasks
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
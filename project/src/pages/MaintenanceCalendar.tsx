import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar as CalendarIcon,
  X,
  Ship,
  User,
  Clock as ClockIcon
} from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { MaintenanceTask } from '../types';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Helper functions for task styling
const getTaskStatusColor = (status: MaintenanceTask['status']): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'in-progress':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTaskStatusIcon = (status: MaintenanceTask['status']) => {
  switch (status) {
    case 'scheduled':
      return <CalendarIcon size={12} className="mr-1 flex-shrink-0" />;
    case 'in-progress':
      return <Clock size={12} className="mr-1 flex-shrink-0" />;
    case 'completed':
      return <CheckCircle2 size={12} className="mr-1 flex-shrink-0" />;
    case 'overdue':
      return <AlertTriangle size={12} className="mr-1 flex-shrink-0" />;
    default:
      return null;
  }
};

// Day Detail Modal Component
interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  tasks: MaintenanceTask[];
}

const DayDetailModal: React.FC<DayDetailModalProps> = ({ isOpen, onClose, date, tasks }) => {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getPriorityBadgeColor = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center">
            <CalendarIcon size={20} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Tasks for {formatDate(date)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-grow">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No tasks scheduled for this day.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(task.status)}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Ship size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{task.shipName}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{task.estimatedHours} hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadgeColor(task.priority)}`}>
                        {task.priority.toUpperCase()} Priority
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const MaintenanceCalendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const tasks = useTaskStore((state) => state.tasks);

  // State for the day detail modal
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDayDetailOpen(true);
  };

  const handleCloseModal = () => {
    setIsDayDetailOpen(false);
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const calendarDays = [];

    // Add days from previous month
    const daysFromPrevMonth = startingDayOfWeek;
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const lastDayOfPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i;
      const date = new Date(prevMonthYear, prevMonth, day);
      calendarDays.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: false,
        tasks: getTasksForDate(date)
      });
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      calendarDays.push({
        date,
        day,
        isCurrentMonth: true,
        isToday,
        tasks: getTasksForDate(date)
      });
    }

    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - calendarDays.length;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextMonthYear, nextMonth, day);
      calendarDays.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: false,
        tasks: getTasksForDate(date)
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      {/* Day Detail Modal */}
      {selectedDate && (
        <DayDetailModal
          isOpen={isDayDetailOpen}
          onClose={handleCloseModal}
          date={selectedDate}
          tasks={getTasksForDate(selectedDate)}
        />
      )}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Maintenance Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">View and schedule maintenance activities across your fleet</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* Calendar header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CalendarIcon size={24} className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {months[currentMonth]} {currentYear}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => {
                  setCurrentMonth(today.getMonth());
                  setCurrentYear(today.getFullYear());
                }}
                className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
              >
                Today
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Task color legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Low Priority</span>
            </div>
            <div className="flex items-center ml-4">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
              <span>Overdue</span>
            </div>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Day of week headers */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              {daysOfWeek.map((day, idx) => (
                <div
                  key={day}
                  className={`px-2 py-3 text-center text-sm font-semibold ${
                    idx === 0 || idx === 6 ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDayClick(day.date)}
                  className={`min-h-[120px] px-3 py-2 border-r border-b border-gray-200
                    ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : day.isToday ? 'bg-blue-50' : 'bg-white'}
                    ${index % 7 === 6 ? 'border-r-0' : ''}
                    ${day.tasks.length > 0 ? 'hover:shadow-inner transition-shadow' : ''}
                    relative group cursor-pointer hover:bg-gray-50`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      day.isToday
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white h-7 w-7 rounded-full flex items-center justify-center shadow-sm'
                        : index % 7 === 0 || index % 7 === 6
                          ? 'text-blue-600'
                          : ''
                    }`}>
                      {day.day}
                    </span>
                    {day.tasks.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-sm">
                        {day.tasks.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-y-auto max-h-[84px]">
                    {day.tasks.slice(0, 3).map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className={`text-xs p-1.5 rounded-md border shadow-sm truncate flex items-center cursor-pointer
                          hover:shadow-md transition-all transform hover:-translate-y-0.5 ${getTaskStatusColor(task.status)}`}
                        style={{
                          background: `linear-gradient(to right,
                            ${task.priority === 'high' ? '#FEE2E2' :
                             task.priority === 'medium' ? '#FEF3C7' :
                             '#DBEAFE'} 0%,
                            ${task.priority === 'high' ? '#FEE2E2' :
                             task.priority === 'medium' ? '#FEF3C7' :
                             '#DBEAFE'} 30%,
                            ${task.priority === 'high' ? '#FEF2F2' :
                             task.priority === 'medium' ? '#FFFBEB' :
                             '#EFF6FF'} 100%)`
                        }}
                      >
                        <div className="flex items-center w-full">
                          {getTaskStatusIcon(task.status)}
                          <span className="truncate flex-grow">{task.title}</span>
                          {task.priority === 'high' && (
                            <span className="w-2 h-2 rounded-full bg-red-500 ml-1 flex-shrink-0"></span>
                          )}
                          {task.priority === 'medium' && (
                            <span className="w-2 h-2 rounded-full bg-yellow-500 ml-1 flex-shrink-0"></span>
                          )}
                          {task.priority === 'low' && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 ml-1 flex-shrink-0"></span>
                          )}
                        </div>
                      </div>
                    ))}

                    {day.tasks.length > 3 && (
                      <div className="text-xs text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md p-1.5 flex items-center justify-center shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer">
                        <AlertCircle size={12} className="mr-1" />
                        {day.tasks.length - 3} more task{day.tasks.length - 3 > 1 ? 's' : ''}
                      </div>
                    )}

                    {/* Add task button - only visible on hover for current month */}
                    {day.isCurrentMonth && (
                      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCalendar;
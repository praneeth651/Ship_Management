import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MaintenanceTask } from '../types';
import { mockTasks } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';
import { useNotificationStore } from './notificationStore';

interface TaskStore {
  tasks: MaintenanceTask[];
  addTask: (taskData: Omit<MaintenanceTask, 'id'>) => void;
  updateTask: (id: string, updates: Partial<MaintenanceTask>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: MaintenanceTask[]) => void;
  rescheduleTask: (id: string, newDueDate: string) => void;
  updateTaskStatus: (id: string, newStatus: MaintenanceTask['status']) => void;
}

// Get tasks from localStorage or use mockTasks as initial data
const getInitialTasks = (): MaintenanceTask[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : mockTasks;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: getInitialTasks(),
      addTask: (taskData) => {
        const newTask: MaintenanceTask = {
          ...taskData,
          id: uuidv4(),
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));

        // Create notification for new task
        useNotificationStore.getState().addNotification({
          title: 'New Task Created',
          message: `Task "${taskData.title}" for ${taskData.shipName} has been created`,
          type: 'info',
          relatedId: newTask.id
        });
      },
      updateTask: (id, updates) => {
        const currentTask = get().tasks.find(task => task.id === id);
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));

        // Create notification for task update
        if (currentTask) {
          useNotificationStore.getState().addNotification({
            title: 'Task Updated',
            message: `Task "${currentTask.title}" has been updated`,
            type: 'info',
            relatedId: id
          });
        }
      },
      deleteTask: (id) => {
        const taskToDelete = get().tasks.find(task => task.id === id);
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));

        // Create notification for task deletion
        if (taskToDelete) {
          useNotificationStore.getState().addNotification({
            title: 'Task Removed',
            message: `Task "${taskToDelete.title}" has been removed`,
            type: 'info',
            relatedId: id
          });
        }
      },
      setTasks: (tasks) => set({ tasks }),
      rescheduleTask: (id, newDueDate) => {
        const task = get().tasks.find(t => t.id === id);
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, dueDate: newDueDate } : task
          ),
        }));

        // Create notification for rescheduled task
        if (task) {
          const formattedDate = new Date(newDueDate).toLocaleDateString();
          useNotificationStore.getState().addNotification({
            title: 'Task Rescheduled',
            message: `Task "${task.title}" has been rescheduled to ${formattedDate}`,
            type: 'info',
            relatedId: id
          });
        }
      },
      updateTaskStatus: (id, newStatus) => {
        const task = get().tasks.find(t => t.id === id);
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          ),
        }));

        // Create notification for status update
        if (task) {
          let notificationType: 'info' | 'success' | 'urgent' = 'info';
          let message = `Task "${task.title}" status changed to ${newStatus}`;

          if (newStatus === 'completed') {
            notificationType = 'success';
            message = `Task "${task.title}" has been completed`;
          } else if (newStatus === 'overdue') {
            notificationType = 'urgent';
            message = `Task "${task.title}" is now overdue`;
          }

          useNotificationStore.getState().addNotification({
            title: 'Task Status Updated',
            message,
            type: notificationType,
            relatedId: id
          });
        }
      },
    }),
    {
      name: 'task-storage', // unique name for localStorage
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MaintenanceTask } from '../types';
import { mockTasks } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

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
    (set) => ({
      tasks: getInitialTasks(),
      addTask: (taskData) => {
        const newTask: MaintenanceTask = {
          ...taskData,
          id: uuidv4(),
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        ),
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      setTasks: (tasks) => set({ tasks }),
      rescheduleTask: (id, newDueDate) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, dueDate: newDueDate } : task
        ),
      })),
      updateTaskStatus: (id, newStatus) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        ),
      })),
    }),
    {
      name: 'task-storage', // unique name for localStorage
    }
  )
);
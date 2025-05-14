import { create } from 'zustand';
import { MaintenanceTask } from '../types';
import { mockTasks } from '../data/mockData';

interface TaskStore {
  tasks: MaintenanceTask[];
  addTask: (task: MaintenanceTask) => void;
  updateTask: (id: string, updates: Partial<MaintenanceTask>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: MaintenanceTask[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: mockTasks,
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    ),
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  setTasks: (tasks) => set({ tasks }),
})); 
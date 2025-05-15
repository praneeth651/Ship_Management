import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'info' | 'success' | 'urgent';
  relatedId?: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      
      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          read: false,
        };
        set((state) => ({ 
          notifications: [newNotification, ...state.notifications] 
        }));
      },
      
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
      })),
      
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      })),
      
      deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== id),
      })),
      
      clearAllNotifications: () => set({ notifications: [] }),
      
      getUnreadCount: () => {
        return get().notifications.filter(notification => !notification.read).length;
      },
    }),
    {
      name: 'notification-storage',
    }
  )
);

import { User, Ship, ShipComponent, MaintenanceJob, Notification } from '../types';

const STORAGE_KEYS = {
  USERS: 'entnt_users',
  CURRENT_USER: 'entnt_current_user',
  SHIPS: 'entnt_ships',
  COMPONENTS: 'entnt_components',
  JOBS: 'entnt_jobs',
  NOTIFICATIONS: 'entnt_notifications'
} as const;

// Initialize default admin user if no users exist
const initializeDefaultUser = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!users) {
    const defaultAdmin: User = {
      id: '1',
      email: 'admin@entnt.com',
      password: 'admin123', // In a real app, this would be hashed
      name: 'Admin User',
      role: 'admin'
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultAdmin]));
  }
};

// Generic storage operations
const getItem = <T>(key: string): T[] => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};

const setItem = <T>(key: string, value: T[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// User operations
export const getUsers = (): User[] => getItem(STORAGE_KEYS.USERS);
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const login = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
  return user || null;
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Ship operations
export const getShips = (): Ship[] => getItem(STORAGE_KEYS.SHIPS);
export const addShip = (ship: Ship): void => {
  const ships = getShips();
  setItem(STORAGE_KEYS.SHIPS, [...ships, ship]);
};
export const updateShip = (updatedShip: Ship): void => {
  const ships = getShips();
  setItem(STORAGE_KEYS.SHIPS, ships.map(ship => 
    ship.id === updatedShip.id ? updatedShip : ship
  ));
};
export const deleteShip = (id: string): void => {
  const ships = getShips();
  setItem(STORAGE_KEYS.SHIPS, ships.filter(ship => ship.id !== id));
};

// Component operations
export const getComponents = (): ShipComponent[] => getItem(STORAGE_KEYS.COMPONENTS);
export const getShipComponents = (shipId: string): ShipComponent[] => {
  const components = getComponents();
  return components.filter(component => component.shipId === shipId);
};
export const addComponent = (component: ShipComponent): void => {
  const components = getComponents();
  setItem(STORAGE_KEYS.COMPONENTS, [...components, component]);
};
export const updateComponent = (updatedComponent: ShipComponent): void => {
  const components = getComponents();
  setItem(STORAGE_KEYS.COMPONENTS, components.map(component => 
    component.id === updatedComponent.id ? updatedComponent : component
  ));
};
export const deleteComponent = (id: string): void => {
  const components = getComponents();
  setItem(STORAGE_KEYS.COMPONENTS, components.filter(component => component.id !== id));
};

// Maintenance job operations
export const getJobs = (): MaintenanceJob[] => getItem(STORAGE_KEYS.JOBS);
export const getShipJobs = (shipId: string): MaintenanceJob[] => {
  const jobs = getJobs();
  return jobs.filter(job => job.shipId === shipId);
};
export const addJob = (job: MaintenanceJob): void => {
  const jobs = getJobs();
  setItem(STORAGE_KEYS.JOBS, [...jobs, job]);
};
export const updateJob = (updatedJob: MaintenanceJob): void => {
  const jobs = getJobs();
  setItem(STORAGE_KEYS.JOBS, jobs.map(job => 
    job.id === updatedJob.id ? updatedJob : job
  ));
};
export const deleteJob = (id: string): void => {
  const jobs = getJobs();
  setItem(STORAGE_KEYS.JOBS, jobs.filter(job => job.id !== id));
};

// Notification operations
export const getNotifications = (): Notification[] => getItem(STORAGE_KEYS.NOTIFICATIONS);
export const addNotification = (notification: Notification): void => {
  const notifications = getNotifications();
  setItem(STORAGE_KEYS.NOTIFICATIONS, [notification, ...notifications]);
};
export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifications.map(notification =>
    notification.id === id ? { ...notification, read: true } : notification
  ));
};
export const deleteNotification = (id: string): void => {
  const notifications = getNotifications();
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifications.filter(notification => notification.id !== id));
};

// Initialize storage
export const initializeStorage = (): void => {
  initializeDefaultUser();
};
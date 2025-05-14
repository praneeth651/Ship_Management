export interface Ship {
  id: string;
  name: string;
  imoNumber: string;
  flag: string;
  status: 'operational' | 'maintenance' | 'repair' | 'inspection';
  createdAt: string;
  updatedAt: string;
}

export interface ShipComponent {
  id: string;
  shipId: string;
  name: string;
  serialNumber: string;
  installationDate: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: 'operational' | 'maintenance-required' | 'under-maintenance' | 'failed';
}

export interface MaintenanceJob {
  id: string;
  shipId: string;
  componentId: string;
  type: 'routine' | 'repair' | 'inspection' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  assignedEngineerId: string;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  type: 'job-created' | 'job-updated' | 'job-completed' | 'maintenance-due';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  relatedId?: string;
}
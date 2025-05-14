export interface Ship {
  id: string;
  name: string;
  type: string;
  year: number;
  status: 'operational' | 'scheduled' | 'in-progress' | 'overdue';
  lastInspection: string;
  nextMaintenance: string;
  pendingTasks: number;
  captain?: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  shipId: string;
  shipName: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  dueDate: string;
  estimatedHours: number;
}

export interface MaintenanceRecord {
  id: string;
  taskId: string;
  shipId: string;
  date: string;
  type: string;
  description: string;
  technician: string;
  hours: number;
  partsReplaced?: string[];
  notes?: string;
}
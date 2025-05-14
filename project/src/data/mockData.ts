import { Ship, MaintenanceTask } from '../types';

export const mockShips: Ship[] = [
  {
    id: 'ship-001',
    name: 'Oceanic Voyager',
    type: 'Cargo Ship',
    year: 2018,
    status: 'operational',
    lastInspection: 'Mar 15, 2024',
    nextMaintenance: 'May 10, 2024',
    pendingTasks: 3,
    captain: 'Capt. Sarah Chen'
  },
  {
    id: 'ship-002',
    name: 'Northern Star',
    type: 'Oil Tanker',
    year: 2015,
    status: 'scheduled',
    lastInspection: 'Feb 28, 2024',
    nextMaintenance: 'Apr 25, 2024',
    pendingTasks: 5,
    captain: 'Capt. Robert Miller'
  },
  {
    id: 'ship-003',
    name: 'Sea Falcon',
    type: 'Container Ship',
    year: 2020,
    status: 'in-progress',
    lastInspection: 'Apr 05, 2024',
    nextMaintenance: 'Apr 20, 2024',
    pendingTasks: 2,
    captain: 'Capt. James Wilson'
  },
  {
    id: 'ship-004',
    name: 'Pacific Explorer',
    type: 'Bulk Carrier',
    year: 2016,
    status: 'overdue',
    lastInspection: 'Jan 10, 2024',
    nextMaintenance: 'Apr 10, 2024',
    pendingTasks: 7,
    captain: 'Capt. Emily Johnson'
  },
  {
    id: 'ship-005',
    name: 'Atlantic Trader',
    type: 'Cargo Ship',
    year: 2019,
    status: 'operational',
    lastInspection: 'Mar 22, 2024',
    nextMaintenance: 'Jun 15, 2024',
    pendingTasks: 1,
    captain: 'Capt. David Thompson'
  },
  {
    id: 'ship-006',
    name: 'Eastern Wind',
    type: 'Container Ship',
    year: 2017,
    status: 'scheduled',
    lastInspection: 'Feb 15, 2024',
    nextMaintenance: 'May 05, 2024',
    pendingTasks: 4,
    captain: 'Capt. Michael Lee'
  }
];

export const mockTasks: MaintenanceTask[] = [
  {
    id: 'task-001',
    title: 'Engine Inspection',
    description: 'Complete inspection of main engine components and systems.',
    shipId: 'ship-001',
    shipName: 'Oceanic Voyager',
    status: 'scheduled',
    priority: 'high',
    assignedTo: 'John Smith',
    dueDate: '2024-05-10',
    estimatedHours: 8
  },
  {
    id: 'task-002',
    title: 'Hull Cleaning',
    description: 'Clean hull to remove marine growth and inspect for damage.',
    shipId: 'ship-002',
    shipName: 'Northern Star',
    status: 'scheduled',
    priority: 'medium',
    assignedTo: 'Lisa Johnson',
    dueDate: '2024-04-25',
    estimatedHours: 12
  },
  {
    id: 'task-003',
    title: 'Propeller Replacement',
    description: 'Replace damaged propeller blades and conduct balancing.',
    shipId: 'ship-003',
    shipName: 'Sea Falcon',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Michael Wong',
    dueDate: '2024-04-12',
    estimatedHours: 16
  },
  {
    id: 'task-004',
    title: 'Navigation System Update',
    description: 'Update navigation software and calibrate systems.',
    shipId: 'ship-004',
    shipName: 'Pacific Explorer',
    status: 'overdue',
    priority: 'medium',
    assignedTo: 'Rachel Green',
    dueDate: '2024-04-10',
    estimatedHours: 6
  },
  {
    id: 'task-005',
    title: 'Fuel Tank Inspection',
    description: 'Inspect fuel tanks for leaks and contamination.',
    shipId: 'ship-005',
    shipName: 'Atlantic Trader',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Thomas Brown',
    dueDate: '2024-04-28',
    estimatedHours: 10
  },
  {
    id: 'task-006',
    title: 'Safety Equipment Check',
    description: 'Inspect and test all safety equipment and life-saving appliances.',
    shipId: 'ship-001',
    shipName: 'Oceanic Voyager',
    status: 'scheduled',
    priority: 'high',
    assignedTo: 'Emma Wilson',
    dueDate: '2024-05-05',
    estimatedHours: 5
  },
  {
    id: 'task-007',
    title: 'Generator Maintenance',
    description: 'Perform routine maintenance on auxiliary generators.',
    shipId: 'ship-002',
    shipName: 'Northern Star',
    status: 'scheduled',
    priority: 'low',
    assignedTo: 'Daniel Martinez',
    dueDate: '2024-05-15',
    estimatedHours: 7
  },
  {
    id: 'task-008',
    title: 'Anchor Chain Inspection',
    description: 'Inspect anchor chains for wear and damage.',
    shipId: 'ship-003',
    shipName: 'Sea Falcon',
    status: 'in-progress',
    priority: 'low',
    assignedTo: 'Sophia Chen',
    dueDate: '2024-04-22',
    estimatedHours: 4
  },
  {
    id: 'task-009',
    title: 'Bilge System Maintenance',
    description: 'Clean and maintain bilge pumps and piping system.',
    shipId: 'ship-004',
    shipName: 'Pacific Explorer',
    status: 'overdue',
    priority: 'high',
    assignedTo: 'William Davis',
    dueDate: '2024-04-08',
    estimatedHours: 9
  },
  {
    id: 'task-010',
    title: 'HVAC System Service',
    description: 'Service and repair HVAC systems throughout the vessel.',
    shipId: 'ship-006',
    shipName: 'Eastern Wind',
    status: 'scheduled',
    priority: 'medium',
    assignedTo: 'Olivia Taylor',
    dueDate: '2024-05-02',
    estimatedHours: 11
  }
];
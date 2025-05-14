import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, PenTool as Tool, Edit, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { Ship } from '../../types';

interface ShipCardProps {
  ship: Ship;
  onEdit: (ship: Ship) => void;
  onDelete: (id: string) => void;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-36 bg-gradient-to-r from-blue-900 to-blue-700 relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute bottom-3 left-4 text-white">
          <h3 className="text-lg font-semibold">{ship.name}</h3>
          <p className="text-sm opacity-90">{ship.type} • {ship.year}</p>
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={() => onEdit(ship)}
            className="p-1.5 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            title="Edit ship"
          >
            <Edit size={16} className="text-blue-700" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${ship.name}?`)) {
                onDelete(ship.id);
              }
            }}
            className="p-1.5 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            title="Delete ship"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">ID: {ship.id.substring(0, 8)}</span>
          <StatusBadge status={ship.status} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Clock size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">Last inspection: {ship.lastInspection}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">Next maintenance: {ship.nextMaintenance}</span>
          </div>
          <div className="flex items-center text-sm">
            <Tool size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-600">{ship.pendingTasks} pending tasks</span>
          </div>
        </div>

        <Link
          to={`/ships/${ship.id}`}
          className="block w-full mt-3 px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-md text-center hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShipCard;
import React, { useEffect, useRef } from 'react';
import { Bell, Check } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const notifications = [
    {
      id: 1,
      title: 'Maintenance Overdue',
      message: 'Engine inspection for "Oceanic Voyager" is 3 days overdue',
      time: '2 hours ago',
      type: 'urgent'
    },
    {
      id: 2,
      title: 'Scheduled Maintenance',
      message: 'Hull cleaning for "Northern Star" scheduled tomorrow',
      time: '5 hours ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'Task Completed',
      message: 'Propeller replacement on "Sea Falcon" completed',
      time: 'Yesterday',
      type: 'success'
    }
  ];

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20"
    >
      <div className="p-3 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {notifications.length} New
          </span>
        </div>
      </div>
      
      <div className="max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="mx-auto h-8 w-8 mb-2 text-gray-400" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    notification.type === 'urgent' ? 'bg-red-500' : 
                    notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    <Check size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 bg-gray-50">
        <button className="w-full px-3 py-2 text-xs font-medium text-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
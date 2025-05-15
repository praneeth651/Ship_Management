import React, { useEffect, useRef } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useNotificationStore, Notification } from '../../stores/notificationStore';
import { formatDistanceToNow } from 'date-fns';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotificationStore();

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

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20"
    >
      <div className="p-3 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {notifications.filter(n => !n.read).length} New
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
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-gray-50' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    notification.type === 'urgent' ? 'bg-red-500' :
                    notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTime(notification.createdAt)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onClick={(e) => handleDelete(notification.id, e)}
                      title="Delete notification"
                    >
                      <Trash2 size={16} />
                    </button>
                    {!notification.read && (
                      <button
                        className="ml-2 text-gray-400 hover:text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-gray-200 bg-gray-50">
        <button
          className="w-full px-3 py-2 text-xs font-medium text-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
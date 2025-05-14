import React from 'react';
import { NavLink } from 'react-router-dom';
import { Anchor, Calendar, Home, LifeBuoy, Ship, PenTool as Tool, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Ship Inventory', icon: <Ship size={20} />, path: '/ships' },
    { name: 'Maintenance Tasks', icon: <Tool size={20} />, path: '/tasks' },
    { name: 'Maintenance Calendar', icon: <Calendar size={20} />, path: '/calendar' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:transform-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
          <div className="flex items-center space-x-2">
            <Anchor size={24} className="text-blue-300" />
            <span className="text-lg font-semibold">ShipMate</span>
          </div>
          <button 
            className="p-2 rounded-md text-blue-300 hover:text-white hover:bg-blue-800 md:hidden"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-800">
          <div className="flex items-center space-x-3 text-sm text-blue-200 hover:text-white cursor-pointer">
            <LifeBuoy size={20} />
            <span>Support & Help</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

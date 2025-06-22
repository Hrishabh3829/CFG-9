import React from 'react';
import { FaUsers, FaClipboardCheck, FaChartLine, FaCog, FaUserShield } from 'react-icons/fa';

const Sidebar = ({ onNavigate, currentPage = "dashboard" }) => {
  const menuItems = [
    { 
      id: 'dashboard',
      text: 'Dashboard', 
      icon: <FaUsers className="w-5 h-5" />, 
      description: 'Overview & Statistics'
    },
    { 
      id: 'user-management',
      text: 'User Management', 
      icon: <FaUserShield className="w-5 h-5" />, 
      description: 'Manage NGOs & Frontliners'
    },
    { 
      id: 'projects',
      text: 'Projects', 
      icon: <FaClipboardCheck className="w-5 h-5" />, 
      description: 'Project Management'
    },
    { 
      id: 'funding',
      text: 'Funding Status', 
      icon: <FaChartLine className="w-5 h-5" />, 
      description: 'Funding Analytics'
    },
    { 
      id: 'settings',
      text: 'Settings', 
      icon: <FaCog className="w-5 h-5" />, 
      description: 'Admin Settings'
    },
  ];

  return (
    <div className="w-60 h-screen bg-black text-yellow-400 border-r border-yellow-400 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-yellow-400">
        <h1 className="text-lg font-semibold">ADMIN PANEL</h1>
      </div>
      <ul className="flex flex-col px-2 py-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center p-3 rounded cursor-pointer transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-yellow-400 text-black'
                : 'hover:bg-yellow-400/10 text-yellow-400'
            }`}
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            <div className={`mr-3 ${currentPage === item.id ? 'text-black' : 'text-yellow-400'}`}>
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.text}</span>
              <span className={`text-xs ${currentPage === item.id ? 'text-black/70' : 'text-yellow-400/60'}`}>
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

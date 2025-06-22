import React from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Tasks', icon: <AssignmentIcon />, page: 'tasks' },
    { text: 'Projects', icon: <FolderIcon />, page: 'projects' },
    { text: 'Priority', icon: <PriorityHighIcon />, page: 'priority' },
    { text: 'Settings', icon: <SettingsIcon />, page: 'settings' },
  ];

  return (
    <div className="w-60 h-screen bg-black text-yellow-400 border-r border-yellow-400 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-yellow-400">
        <h1 className="text-lg font-semibold">FRONTLINERS</h1>
      </div>
      <ul className="flex flex-col px-2">
        {menuItems.map((item) => (
          <li
            key={item.text}
            className={`flex items-center p-3 rounded cursor-pointer transition ${
              currentPage === item.page 
                ? 'bg-yellow-400/20 text-yellow-300' 
                : 'hover:bg-yellow-400/10'
            }`}
            onClick={() => onNavigate(item.page)}
          >
            <div className="text-yellow-400 mr-3">{item.icon}</div>
            <span className="text-sm font-medium">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

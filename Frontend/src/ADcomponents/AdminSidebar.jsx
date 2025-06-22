import React from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { text: 'Funding', icon: <MonetizationOnIcon />, path: '/funding' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
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
            className="flex items-center p-3 rounded cursor-pointer hover:bg-yellow-400/10 transition"
            onClick={() => navigate(item.path)}
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

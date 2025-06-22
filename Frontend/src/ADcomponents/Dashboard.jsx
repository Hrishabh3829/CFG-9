import React from 'react';
import { FaUsers, FaClipboardCheck, FaServer, FaUserShield, FaBug } from 'react-icons/fa';

const AdminDashboard = () => {
  const summaryCards = [
    {
      title: 'Total Users',
      value: '120',
      icon: <FaUsers className="text-indigo-600 text-4xl" />,
    },
    {
      title: 'Pending Approvals',
      value: '4',
      icon: <FaClipboardCheck className="text-orange-500 text-4xl" />,
    },
    {
      title: 'System Alerts',
      value: '2',
      icon: <FaBug className="text-red-500 text-4xl" />,
    },
  ];

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 flex justify-between items-center min-h-[150px] transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{card.title}</p>
              <p className="text-4xl font-bold mt-2">{card.value}</p>
            </div>
            <div>{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="md:col-span-2 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold mb-4">User Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage users, assign roles, and handle access control.
          </p>
          {/* Future: Add user table/list here */}
        </div>

        {/* System Logs / Activity */}
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold mb-4">System Logs</h2>
          <div className="mt-4 space-y-3 text-gray-500 dark:text-gray-400 text-sm">
            <p>• User "john_admin" added a new user</p>
            <p>• Role updated for user "dev_team_1"</p>
            <p>• Security scan completed - 0 threats</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

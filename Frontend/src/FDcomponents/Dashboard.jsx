import React from 'react';
import { FaTasks, FaFolderOpen, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const summaryCards = [
    {
      title: 'Total Tasks',
      value: '24',
      icon: <FaTasks className="text-blue-600 text-4xl" />,
    },
    {
      title: 'Active Projects',
      value: '8',
      icon: <FaFolderOpen className="text-green-700 text-4xl" />,
    },
    {
      title: 'High Priority',
      value: '5',
      icon: <FaExclamationTriangle className="text-red-600 text-4xl" />,
    },
  ];

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>

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
        {/* Project Progress */}
        <div className="md:col-span-2 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Project progress visualization will be displayed here
          </p>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="mt-4 space-y-3 text-gray-500 dark:text-gray-400 text-sm">
            <p>• Task "Homepage Design" completed</p>
            <p>• New project "E-commerce" added</p>
            <p>• Priority updated for "Database Migration"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

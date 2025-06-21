import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText, CheckCircle, XCircle, Clock, Upload, Eye } from 'lucide-react';


const Dashboard = () => {
  const stats = {
    completed: 8,
    inProgress: 5,
    discontinued: 2,
    totalFunds: 450000
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-yellow-400">Overview of your NGO projects and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Completed Projects</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.completed}</p>
            </div>
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.inProgress}</p>
            </div>
            <Clock className="text-yellow-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Discontinued</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.discontinued}</p>
            </div>
            <XCircle className="text-red-500 w-8 h-8" />
          </div>
        </div>

        <div className="bg-gray-800 border border-yellow-500 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Total Funds</p>
              <p className="text-3xl font-bold text-white mt-1">${stats.totalFunds.toLocaleString()}</p>
            </div>
            <FileText className="text-yellow-500 w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-yellow-500 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Project Analysis</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <span className="text-white">Success Rate</span>
            <div className="w-32 bg-gray-600 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{width: '80%'}}></div>
            </div>
            <span className="text-yellow-400">80%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <span className="text-white">Average Project Duration</span>
            <span className="text-yellow-400">8 months</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <span className="text-white">Budget Utilization</span>
            <div className="w-32 bg-gray-600 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{width: '92%'}}></div>
            </div>
            <span className="text-yellow-400">92%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
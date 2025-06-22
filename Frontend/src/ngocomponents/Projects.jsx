import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText, CheckCircle, XCircle, Clock, Upload, Eye } from 'lucide-react';

const Projects = ({ projects, onAcceptProject, onRejectProject }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
        <p className="text-yellow-400">Review and manage project applications</p>
      </div>

      <div className="space-y-6">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 border border-yellow-500 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-3">{project.description}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="text-yellow-400">
                    <strong>Estimated Funds:</strong> ${project.estimatedFunds.toLocaleString()}
                  </span>
                  <span className="text-gray-400">
                    <strong>Submitted:</strong> {project.submittedDate}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'pending' 
                      ? 'bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-500' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {project.status === 'pending' && (
                <div className="flex space-x-3 ml-6">
                  <button 
                    onClick={() => onAcceptProject(project.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button 
                    onClick={() => onRejectProject(project.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Projects;
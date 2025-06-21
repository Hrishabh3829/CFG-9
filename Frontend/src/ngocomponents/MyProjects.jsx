import React, { useState } from 'react';
import { LayoutDashboard, FolderOpen, User, Settings, LogOut, FileText, CheckCircle, XCircle, Clock, Upload, Eye } from 'lucide-react';

const MyProjects = ({ acceptedProjects, onUploadDocument }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
        <p className="text-yellow-400">Manage your accepted projects and upload documents</p>
      </div>

      <div className="space-y-6">
        {acceptedProjects.map(project => (
          <div key={project.id} className="bg-gray-800 border border-yellow-500 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <div className="flex items-center space-x-6 text-sm mb-4">
                  <span className="text-yellow-400">
                    <strong>Project ID:</strong> {project.id}
                  </span>
                  <span className="text-yellow-400">
                    <strong>Estimated Funds:</strong> ${project.estimatedFunds.toLocaleString()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-500 bg-opacity-20 text-black border border-green-500'
                      : 'bg-yellow-500 bg-opacity-20 text-black border border-yellow-500'
                  }`}>
                    {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Documents</h4>
              
              {project.documents.length > 0 && (
                <div className="mb-4 space-y-2">
                  {project.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-yellow-400" />
                        <span className="text-white">{doc}</span>
                      </div>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-4">
                <label className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => onUploadDocument(project.id, e.target.files[0])}
                    accept=".pdf"
                  />
                </label>
                <span className="text-gray-400 text-sm">Accepted formats: PDF only</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyProjects;
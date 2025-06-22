import React, { useState } from 'react';
import { FaFolder, FaTasks, FaEllipsisV, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Priority = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorIndex, setAnchorIndex] = useState(null);

  const priorityTasks = [
    {
      id: 1,
      title: 'Security Audit Implementation',
      project: 'System Security',
      deadline: '2024-02-15',
      priority: 'Critical',
    },
    {
      id: 2,
      title: 'Client Meeting Preparation',
      project: 'Business Development',
      deadline: '2024-02-10',
      priority: 'High',
    },
    {
      id: 3,
      title: 'Database Optimization',
      project: 'Performance Improvement',
      deadline: '2024-02-20',
      priority: 'High',
    },
  ];

  const priorityProjects = [
    {
      id: 1,
      name: 'E-commerce Platform Launch',
      status: 'In Progress',
      deadline: '2024-03-01',
      priority: 'Critical',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'Planning',
      deadline: '2024-04-15',
      priority: 'High',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  const renderPriorityIcon = (priority) => {
    return ['critical', 'high'].includes(priority.toLowerCase()) ? (
      <FaArrowUp className="ml-2 text-red-600" />
    ) : (
      <FaArrowDown className="ml-2 text-blue-600" />
    );
  };

  const handleMenuToggle = (index) => {
    setAnchorIndex(anchorIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Priority Management</h2>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            tabValue === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
          }`}
          onClick={() => setTabValue(0)}
        >
          Priority Tasks
        </button>
        <button
          className={`ml-4 px-4 py-2 ${
            tabValue === 1 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
          }`}
          onClick={() => setTabValue(1)}
        >
          Priority Projects
        </button>
      </div>

      {/* Tasks Tab */}
      {tabValue === 0 && (
        <div className="bg-white rounded shadow">
          {priorityTasks.map((task, index) => (
            <div key={task.id} className="border-b last:border-none hover:bg-gray-50">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-start space-x-4">
                  <FaTasks className="mt-1 text-gray-500" />
                  <div>
                    <div className="flex items-center font-semibold text-lg">
                      {task.title}
                      {renderPriorityIcon(task.priority)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {task.project} • Due: {task.deadline}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-white text-sm px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <button onClick={() => handleMenuToggle(index)}>
                    <FaEllipsisV className="text-gray-600" />
                  </button>
                  {anchorIndex === index && (
                    <div className="absolute mt-10 right-6 bg-white shadow-lg rounded border w-40 z-10">
                      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setAnchorIndex(null)}>Edit</button>
                      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setAnchorIndex(null)}>Change Priority</button>
                      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600" onClick={() => setAnchorIndex(null)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects Tab */}
      {tabValue === 1 && (
        <div className="bg-white rounded shadow">
          {priorityProjects.map((project, index) => (
            <div key={project.id} className="border-b last:border-none hover:bg-gray-50">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-start space-x-4">
                  <FaFolder className="mt-1 text-gray-500" />
                  <div>
                    <div className="flex items-center font-semibold text-lg">
                      {project.name}
                      {renderPriorityIcon(project.priority)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Status: {project.status} • Due: {project.deadline}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-white text-sm px-2 py-1 rounded ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                  <button onClick={() => handleMenuToggle(index + 100)}>
                    <FaEllipsisV className="text-gray-600" />
                  </button>
                  {anchorIndex === index + 100 && (
                    <div className="absolute mt-10 right-6 bg-white shadow-lg rounded border w-40 z-10">
                      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setAnchorIndex(null)}>Edit</button>
                      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setAnchorIndex(null)}>Change Priority</button>
                      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600" onClick={() => setAnchorIndex(null)}>Remove</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Priority;

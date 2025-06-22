import React, { useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import emailjs from '@emailjs/browser';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesigning the company website with modern UI/UX',
      progress: 65,
      team: 4,
      status: 'In Progress',
      deadline: '2025-06-30',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Creating a new mobile application for customers',
      progress: 30,
      team: 6,
      status: 'In Progress',
      deadline: '2025-07-10',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    progress: 0,
    team: 0,
    status: 'Not Started',
    deadline: '',
  });

  const handleOpen = (project = null) => {
    if (project) {
      setEditProject(project);
      setNewProject(project);
    } else {
      setEditProject(null);
      setNewProject({
        name: '',
        description: '',
        progress: 0,
        team: 0,
        status: 'Not Started',
        deadline: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
  };

  const sendDeadlineEmail = (project) => {
    const daysLeft = differenceInDays(parseISO(project.deadline), new Date());
    if (daysLeft <= 7 && daysLeft >= 0) {
      emailjs.send(
        'YOUR_SERVICE_ID',       // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID',      // Replace with your EmailJS Template ID
        {
          to_name: 'Project Team',
          project_name: project.name,
          deadline: project.deadline,
          to_email: 'user@example.com' // You can make this dynamic if needed
        },
        'YOUR_PUBLIC_KEY'        // Replace with your EmailJS Public Key
      ).then(() => {
        console.log('📧 Email sent successfully');
      }).catch((error) => {
        console.error('❌ Email failed to send:', error);
      });
    }
  };

  const handleSave = () => {
    const updatedProject = { ...newProject };
    if (editProject) {
      setProjects(projects.map((p) => (p.id === editProject.id ? { ...updatedProject, id: p.id } : p)));
      sendDeadlineEmail(updatedProject);
    } else {
      updatedProject.id = projects.length + 1;
      setProjects([...projects, updatedProject]);
      sendDeadlineEmail(updatedProject);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'not started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <button
          onClick={() => handleOpen()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const daysLeft = differenceInDays(parseISO(project.deadline), new Date());

          return (
            <div key={project.id} className="relative bg-white rounded shadow p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1">
              {daysLeft <= 7 && daysLeft >= 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  ⏰ {daysLeft} day{daysLeft !== 1 ? 's' : ''} left!
                </div>
              )}
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                <span className={`px-2 py-1 text-sm rounded ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{project.description}</p>

              <div className="mb-2">
                <p className="text-sm text-gray-500">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div className="bg-blue-600 h-2 rounded" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
              </div>

              <div className="text-sm text-gray-700 mt-2">👥 {project.team} team members</div>
              <div className="text-sm text-gray-500 mt-1">📅 Deadline: {project.deadline}</div>

              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => handleOpen(project)} className="text-blue-600 hover:underline">✏️ Edit</button>
                <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:underline">🗑️ Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project Name"
                className="w-full border px-3 py-2 rounded"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full border px-3 py-2 rounded"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Progress (%)"
                className="w-full border px-3 py-2 rounded"
                min={0}
                max={100}
                value={newProject.progress}
                onChange={(e) => setNewProject({ ...newProject, progress: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Team Members"
                className="w-full border px-3 py-2 rounded"
                min={0}
                value={newProject.team}
                onChange={(e) => setNewProject({ ...newProject, team: Number(e.target.value) })}
              />
              <input
                type="text"
                placeholder="Status"
                className="w-full border px-3 py-2 rounded"
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={newProject.deadline}
                onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
              />
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editProject ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

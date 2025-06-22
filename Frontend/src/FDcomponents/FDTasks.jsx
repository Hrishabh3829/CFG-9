import React, { useState } from 'react';
import {
  Chip,
} from '@mui/material';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Homepage',
      project: 'Website Redesign',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-02-15',
    },
    {
      id: 2,
      title: 'Database Migration',
      project: 'System Upgrade',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '2024-02-20',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    project: '',
    priority: '',
    status: '',
    dueDate: '',
  });

  const handleOpen = (task = null) => {
    if (task) {
      setEditTask(task);
      setNewTask(task);
    } else {
      setEditTask(null);
      setNewTask({ title: '', project: '', priority: '', status: '', dueDate: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTask(null);
  };

  const handleSave = () => {
    if (editTask) {
      setTasks(tasks.map((t) => (t.id === editTask.id ? { ...newTask, id: t.id } : t)));
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => handleOpen()}
        >
          <FaPlus /> Add Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Project</th>
              <th className="py-3 px-4 text-left">Priority</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="py-2 px-4">{task.title}</td>
                <td className="py-2 px-4">{task.project}</td>
                <td className="py-2 px-4">
                  <span className={`text-white text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-2 px-4">{task.status}</td>
                <td className="py-2 px-4">{task.dueDate}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => handleOpen(task)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{editTask ? 'Edit Task' : 'Add New Task'}</h2>
            <div className="space-y-4">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Project"
                value={newTask.project}
                onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
              />
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editTask ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default tasks;

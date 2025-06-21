import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard, FolderOpen, User, Settings } from 'lucide-react';

// Public Pages
import Home from "./components/Home";
import News from "./components/News";
import ContactUs from "./components/Contactus";
import Login from "./components/Login";
import Outliner from "./components/Outliner";
import Total from "./Total";

// NGO Dashboard Components
import NGODashboard from "./ngocomponents/Dashboard.jsx";
import Projects from "./ngocomponents/Projects";
import MyProjects from "./ngocomponents/MyProjects";
import SettingsPage from "./ngocomponents/SettingsPage.jsx";
import mockProjects from "./ngocomponents/mockProjects.jsx";
import mockAcceptedProjects from "./ngocomponents/mockAcceptedProjects.jsx";

// Admin Dashboard Components
import AdminNavbar from "./ADcomponents/Navbar";
import AdminSidebar from "./ADcomponents/Sidebar";
import AdminDashboard from "./ADcomponents/Dashboard";
import AdminProjects from "./ADcomponents/Projects";
import FundingStatus from "./ADcomponents/FundingStatus";
import AdminSettings from "./ADcomponents/Settings";

// NGO Dashboard Wrapper
const DashboardApp = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [projects, setProjects] = useState(mockProjects);
  const [acceptedProjects, setAcceptedProjects] = useState(mockAcceptedProjects);

  const handleAcceptProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setAcceptedProjects([...acceptedProjects, {
        ...project,
        status: "in-progress",
        documents: []
      }]);
      setProjects(projects.filter((p) => p.id !== projectId));
    }
  };

  const handleRejectProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const handleUploadDocument = (projectId, file) => {
    if (file && file.type === "application/pdf") {
      setAcceptedProjects(acceptedProjects.map((project) =>
        project.id === projectId
          ? { ...project, documents: [...project.documents, file.name] }
          : project
      ));
      alert(`Document "${file.name}" uploaded successfully!`);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "myprojects", label: "My Projects", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <NGODashboard />;
      case "projects":
        return (
          <Projects
            projects={projects}
            onAcceptProject={handleAcceptProject}
            onRejectProject={handleRejectProject}
          />
        );
      case "myprojects":
        return (
          <MyProjects
            acceptedProjects={acceptedProjects}
            onUploadDocument={handleUploadDocument}
          />
        );
      case "settings":
        return <SettingsPage onLogout={handleLogout} />;
      default:
        return <NGODashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 bg-black border-r border-yellow-500">
        <div className="p-6 border-b border-yellow-500">
          <h1 className="text-2xl font-bold text-yellow-500">NGO Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Management System</p>
        </div>
        <nav className="mt-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-gray-800 transition-colors ${
                  currentPage === item.id
                    ? "bg-black bg-opacity-20 text-yellow-400 border-r-2 border-yellow-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex-1 overflow-auto">{renderCurrentPage()}</div>
    </div>
  );
};

// Admin Dashboard Wrapper
const AdminDashboardApp = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="mt-16 p-6">
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/projects" element={<AdminProjects />} />
            <Route path="/admin-dashboard/funding" element={<FundingStatus />} />
            <Route path="/admin-dashboard/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Final App Router
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Outliner />}>
          <Route path="/" element={<Total />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardApp />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboardApp />} />
      </Routes>
    </Router>
  );
};

export default App;

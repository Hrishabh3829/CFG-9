import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard, FolderOpen, User, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";
import { USER_ROLES } from "./constants";
import { authUtils } from "./services/auth";

// Public Pages
import Home from "./components/Home";
import News from "./components/News";
import ContactUs from "./components/ContactUs";
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
import AdminNavbar from "./ADcomponents/AdminNavbar";
import AdminSidebar from "./ADcomponents/AdminSidebar";
import AdminDashboard from "./ADcomponents/AdminDashboard";
import AdminProjects from "./ADcomponents/AdminProjects";
import FundingStatus from "./ADcomponents/FundingStatus";
import AdminSettings from "./ADcomponents/Settings";
import UserManagement from "./ADcomponents/UserManagement";

// Frontliner Dashboard Components
import FrontlinerNavbar from "./FDcomponents/Navbar";
import FrontlinerSidebar from "./FDcomponents/Sidebar";
import FrontlinerDashboard from "./FDcomponents/Dashboard";
import FrontlinerProjects from "./FDcomponents/Projects";
import FrontlinerTasks from "./FDcomponents/tasks";
import FrontlinerPriority from "./FDcomponents/Priority";
import FrontlinerSettings from "./FDcomponents/Settings";

// NGO Dashboard Wrapper
const DashboardApp = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [projects, setProjects] = useState(mockProjects);
  const [acceptedProjects, setAcceptedProjects] = useState(mockAcceptedProjects);

  console.log('DashboardApp (NGO) rendered with currentPage:', currentPage);

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
    navigate('/');
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "myprojects", label: "My Projects", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderCurrentPage = () => {
    console.log('DashboardApp (NGO) - Rendering page:', currentPage);
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
  const [currentPage, setCurrentPage] = useState("dashboard");

  console.log('AdminDashboardApp rendered with currentPage:', currentPage);

  const handleNavigate = (page) => {
    console.log('AdminDashboardApp - Navigating to:', page);
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    console.log('AdminDashboardApp - Rendering page:', currentPage);
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "user-management":
        return <UserManagement />;
      case "projects":
        return <AdminProjects />;
      case "funding":
        return <FundingStatus />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="mt-16 p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

// Frontliner Dashboard Wrapper
const FrontlinerDashboardApp = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  console.log('FrontlinerDashboardApp rendered with currentPage:', currentPage);

  const handleNavigate = (page) => {
    console.log('FrontlinerDashboardApp - Navigating to:', page);
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    console.log('FrontlinerDashboardApp - Rendering page:', currentPage);
    switch (currentPage) {
      case "dashboard":
        return <FrontlinerDashboard />;
      case "projects":
        return <FrontlinerProjects />;
      case "tasks":
        return <FrontlinerTasks />;
      case "priority":
        return <FrontlinerPriority />;
      case "settings":
        return <FrontlinerSettings />;
      default:
        return <FrontlinerDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <FrontlinerSidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <div className="flex-1 flex flex-col">
        <FrontlinerNavbar />
        <main className="mt-16 p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

//frontlinersapp
const FrontlinerDashboardApp = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FDSidebar />
      <div className="flex-1 flex flex-col">
        <FDNavbar />
        <main className="mt-16 p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

// Frontliner Dashboard Wrapper
const FrontlinerDashboardApp = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  console.log('FrontlinerDashboardApp rendered with currentPage:', currentPage);

  const handleNavigate = (page) => {
    console.log('FrontlinerDashboardApp - Navigating to:', page);
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    console.log('FrontlinerDashboardApp - Rendering page:', currentPage);
    switch (currentPage) {
      case "dashboard":
        return <FrontlinerDashboard />;
      case "projects":
        return <FrontlinerProjects />;
      case "tasks":
        return <FrontlinerTasks />;
      case "priority":
        return <FrontlinerPriority />;
      case "settings":
        return <FrontlinerSettings />;
      default:
        return <FrontlinerDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <FrontlinerSidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <div className="flex-1 flex flex-col">
        <FrontlinerNavbar />
        <main className="mt-16 p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

// Final App Router
const App = () => {
  console.log('App component rendered');
  
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Router>
        <Routes>
          <Route element={<Outliner />}>
            <Route path="/" element={<Total />} />
            <Route path="/home" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<div>Test route working!</div>} />
          <Route path="/auth-test" element={
            <div className="p-8">
              <h1>Authentication Test</h1>
              <pre>{JSON.stringify({
                isAuthenticated: authUtils.isAuthenticated(),
                userRole: authUtils.getUserRole(),
                user: authUtils.getUser(),
                currentRoute: authUtils.getCurrentUserRoute()
              }, null, 2)}</pre>
              
              <div className="mt-4">
                <h2>Test Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded">
                    <h3>Admin</h3>
                    <p>Email: admin@test.com</p>
                    <p>Password: Admin123!</p>
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch('http://localhost:8000/api/v1/user/create-test-user', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                          });
                          const data = await response.json();
                          alert(data.message);
                        } catch (error) {
                          alert('Error creating test user: ' + error.message);
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Create Admin
                    </button>
                  </div>
                  
                  <div className="border p-4 rounded">
                    <h3>Frontliner</h3>
                    <p>Email: frontliner@test.com</p>
                    <p>Password: Frontliner123!</p>
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch('http://localhost:8000/api/v1/user/create-test-frontliner', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                          });
                          const data = await response.json();
                          alert(data.message);
                        } catch (error) {
                          alert('Error creating test user: ' + error.message);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Create Frontliner
                    </button>
                  </div>
                  
                  <div className="border p-4 rounded">
                    <h3>NGO</h3>
                    <p>Email: ngo@test.com</p>
                    <p>Password: NGO123!</p>
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch('http://localhost:8000/api/v1/user/create-test-ngo', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                          });
                          const data = await response.json();
                          alert(data.message);
                        } catch (error) {
                          alert('Error creating test user: ' + error.message);
                        }
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded"
                    >
                      Create NGO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route 
            path="/ngo/dashboard/*" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.PARTNER_NGO}>
                <DashboardApp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard/*" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
                <AdminDashboardApp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/frontliner/dashboard/*" 
            element={
              <ProtectedRoute requiredRole={USER_ROLES.FRONTLINER}>
                <FrontlinerDashboardApp />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

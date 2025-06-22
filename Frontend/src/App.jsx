import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactUs from "./components/Contactus";
import Dashboard from "./components/Dashboard";
import EmailVerification from "./components/EmailVerification";
import Home from "./components/Home";
import Login from "./components/Login";
import News from "./components/News";
import Outliner from "./components/Outliner";
import ProtectedRoute from "./components/ProtectedRoute";
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

  // const handleLogout = () => {
  //   alert("Logged out successfully!");
  //   navigate('/');
  // };

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
      // case "settings":
      //   return <SettingsPage onLogout={handleLogout} />;
      // default:
      //   return <NGODashboard />;
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
// const FrontlinerDashboardApp = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <FDSidebar />
//       <div className="flex-1 flex flex-col">
//         <FDNavbar />
//         <main className="mt-16 p-6">
//           {renderCurrentPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// Frontliner Dashboard Wrapper
// const FrontlinerDashboardApp = () => {
//   const [currentPage, setCurrentPage] = useState("dashboard");

//   console.log('FrontlinerDashboardApp rendered with currentPage:', currentPage);

//   const handleNavigate = (page) => {
//     console.log('FrontlinerDashboardApp - Navigating to:', page);
//     setCurrentPage(page);
//   };

//   const renderCurrentPage = () => {
//     console.log('FrontlinerDashboardApp - Rendering page:', currentPage);
//     switch (currentPage) {
//       case "dashboard":
//         return <FrontlinerDashboard />;
//       case "projects":
//         return <FrontlinerProjects />;
//       case "tasks":
//         return <FrontlinerTasks />;
//       case "priority":
//         return <FrontlinerPriority />;
//       case "settings":
//         return <FrontlinerSettings />;
//       default:
//         return <FrontlinerDashboard />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <FrontlinerSidebar onNavigate={handleNavigate} currentPage={currentPage} />
//       <div className="flex-1 flex flex-col">
//         <FrontlinerNavbar />
//         <main className="mt-16 p-6">
//           {renderCurrentPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// Final App Router
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Outliner/>}>
          <Route path="/" element={<Total />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
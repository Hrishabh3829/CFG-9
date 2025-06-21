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
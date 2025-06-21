import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import News from "./components/News";
import ContactUs from "./components/Contactus";
import Login from "./components/Login";
import Outliner from "./components/Outliner";
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
      </Routes>
    </Router>
  );
};

export default App;
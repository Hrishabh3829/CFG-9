import Navbar from "./components/Navbar";
import Home from "./components/Home";
import News from "./components/News";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

const Total = () => {
  return (
    <div className="min-h-screen">
      <Home/>
      <News/>
      <ContactUs/>
    </div>
  );
};

export default Total;

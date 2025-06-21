import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Play } from 'lucide-react';
import { Form, Link } from 'react-router-dom';
import crylogo from '../assets/crylogo.webp';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={crylogo} alt="Luxe Logo" className="h-10 w-auto" />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#news" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                News
              </a>
              <a href="#contact" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Contact Us
              </a>
              <a href="/Login" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Login/SignUp
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Home
            </a>
            <a href="#news" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              News
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Contact Us
            </a>
            <a href="/Login" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
              Login/SignUp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
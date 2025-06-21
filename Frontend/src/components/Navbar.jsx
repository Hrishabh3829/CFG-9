import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import crylogo from '../assets/crylogo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={crylogo} alt="CRY Logo" className="h-10 w-auto" />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/news" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                News
              </Link>
              <Link to="/contact" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Contact Us
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                  <span className="text-yellow-300 text-sm">
                    {user?.name}
                  </span>
                </div>
              ) : (
                <Link to="/login" className="text-yellow-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Login/SignUp
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-yellow-400">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-yellow-400 hover:text-white block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link to="/news" className="text-yellow-400 hover:text-white block px-3 py-2 text-base font-medium">
              News
            </Link>
            <Link to="/contact" className="text-yellow-400 hover:text-white block px-3 py-2 text-base font-medium">
              Contact Us
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-yellow-400 hover:text-white block px-3 py-2 text-base font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-yellow-400 hover:text-white block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Logout
                </button>
                <span className="text-yellow-300 block px-3 py-2 text-sm">
                  {user?.name}
                </span>
              </>
            ) : (
              <Link to="/login" className="text-yellow-400 hover:text-white block px-3 py-2 text-base font-medium">
                Login/SignUp
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
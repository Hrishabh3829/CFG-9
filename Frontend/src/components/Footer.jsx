import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-yellow-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About CRY */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-extrabold mb-4 text-white">CRY – Child Rights and You</h3>
            <p className="text-yellow-200 mb-4 max-w-md">
              We work toward ensuring happier childhoods for every child in India—through education, healthcare, protection, and hope. Every child deserves it.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Impact Stories</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#donate" className="hover:text-white transition-colors">Donate</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-yellow-800 mt-10 pt-6 text-center">
          <p className="text-yellow-500">
            © {new Date().getFullYear()} CRY Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
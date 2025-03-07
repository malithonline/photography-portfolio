import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Instagram, MessageCircle, Lock } from 'lucide-react';

const navStyle = {
  backdropFilter: 'blur(10px)',
};

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 py-2' : 'bg-black/50 py-4'
      }`}
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center transform hover:scale-105 transition-transform"
            >
              <Camera className="h-8 w-8" />
            </Link>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/malithonline/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative transform hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-transparent p-2 rounded-lg">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
              </a>
              <a 
                href="https://wa.me/94760022300" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative transform hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-[#25D366] rounded-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-transparent p-2 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm hover:text-gray-300 transition-colors relative group ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-400'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full ${
                  location.pathname === link.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            <Link
              to="/admin"
              className="flex items-center space-x-1 px-4 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span className="text-sm">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
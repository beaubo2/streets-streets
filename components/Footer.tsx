
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
            <svg className="h-8 w-8 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M18 6H9A3 3 0 0 0 6 9V9A3 3 0 0 0 9 12H15A3 3 0 0 1 18 15V15A3 3 0 0 1 15 18H6" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
            </svg>
            <span className="font-bold text-lg">streets</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            <Link to="/mentors" className="hover:text-white">Mentors</Link>
            <Link to="/mystreets" className="hover:text-white">My Streets</Link>
            <Link to="/profile" className="hover:text-white">Profile</Link>
            <Link to="#" className="hover:text-white">Login</Link>
        </div>

        <div className="mt-4 md:mt-0 text-gray-500 text-xs">
            © 2025 Streets Inc. Vancouver • Montreal
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// Added missing React import
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900';
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center w-full">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 mr-8" onClick={closeMenu}>
              <svg className="h-8 w-8 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M18 6H9A3 3 0 0 0 6 9V9A3 3 0 0 0 9 12H15A3 3 0 0 1 18 15V15A3 3 0 0 1 15 18H6" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold text-xl tracking-tight">streets</span>
            </Link>
            <div className="hidden md:flex md:space-x-8 items-center">
              <Link to="/mentors" className={`text-sm font-medium uppercase tracking-wide ${isActive('/mentors')}`}>
                Mentors
              </Link>
              <Link to="/mystreets" className={`text-sm font-medium uppercase tracking-wide ${isActive('/mystreets')}`}>
                My Streets
              </Link>
              <Link to="/profile" className={`text-sm font-medium uppercase tracking-wide ${isActive('/profile')}`}>
                Profile
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
             {user ? (
               <div className="flex items-center gap-4">
                   <div className="text-right hidden lg:block">
                       <div className="text-sm font-bold text-gray-900">{user.name}</div>
                       <div className="text-xs text-gray-500 uppercase tracking-wide">{user.type}</div>
                   </div>
                   <div 
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => navigate('/profile')}
                   >
                     {user.avatar ? (
                         <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                     ) : (
                         <UserIcon className="h-5 w-5 text-gray-500" />
                     )}
                   </div>
               </div>
             ) : (
               <Link 
                 to="/login"
                 className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
               >
                 Log in / Sign up
               </Link>
             )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/mentors"
              onClick={closeMenu}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Mentors
            </Link>
            <Link
              to="/mystreets"
              onClick={closeMenu}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              My Streets
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Profile
            </Link>
            {!user && (
               <Link
                to="/login"
                onClick={closeMenu}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-900 font-bold hover:bg-gray-50 hover:border-gray-300"
              >
                Log in / Sign up
              </Link>
            )}
          </div>
          {user && (
              <div className="pt-4 pb-4 border-t border-gray-200">
                  <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                          {user.avatar ? (
                              <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                          ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <UserIcon className="h-6 w-6 text-gray-500" />
                              </div>
                          )}
                      </div>
                      <div className="ml-3">
                          <div className="text-base font-medium text-gray-800">{user.name}</div>
                          <div className="text-sm font-medium text-gray-500">{user.email}</div>
                      </div>
                      <button 
                        onClick={() => { logout(); closeMenu(); }}
                        className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                         <span className="text-xs font-bold text-red-500">Log out</span>
                      </button>
                  </div>
              </div>
          )}
        </div>
      )}
      <div className="h-1 w-full flex">
          <div className="w-1/4 bg-blue-600"></div>
          <div className="w-1/4 bg-orange-500"></div>
          <div className="w-1/4 bg-yellow-400"></div>
          <div className="w-1/4 bg-green-500"></div>
      </div>
    </nav>
  );
};

export default Navbar;

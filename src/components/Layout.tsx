// import React, { ReactNode, useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Globe, User, LogOut, Menu, X } from 'lucide-react';
// import UserProfile from './dashboard/UserProfile';
// import { Navigate, useNavigate } from 'react-router-dom';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const navigate = useNavigate() ; 
//   const { user, logout } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
//       {/* Navigation */}
//       <nav className="bg-white/5 backdrop-blur-xl shadow-lg border-b border-white/10 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <div className="relative">
//                 <Globe className="h-8 w-8 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text" />
//                 <div className="absolute inset-0 h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-30"></div>
//               </div>
//               <span className="ml-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                 GlobeTrotter
//               </span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {[
//                 { label: 'Dashboard', href: '#dashboard' },
//                 { label: 'My Trips', href: '#trips' },
//                 { label: 'Explore', href: '#explore' },
//               ].map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className="text-gray-300 hover:text-cyan-400 transition-colors font-medium relative group"
//                 >
//                   {item.label}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}

//               {user && (
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2" onClick={() => navigate("/profile")}>
//                     {user.avatar ? (
//                       <img 
//                         src={user.avatar}
//                         alt={user.name}
//                         className="h-8 w-8 rounded-full object-cover ring-2 ring-cyan-400/50"
//                       />
//                     ) : (
//                       <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
//                         <User className="h-5 w-5 text-white" />
//                       </div>
//                     )}
//                     <span className="text-sm font-medium text-gray-200">{user.name}</span>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
//                   >
//                     <LogOut className="h-5 w-5" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-cyan-500/10"
//               >
//                 {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10">
//             <div className="px-4 py-3 space-y-3">
//               {[
//                 { label: 'Dashboard', href: '#dashboard' },
//                 { label: 'My Trips', href: '#trips' },
//                 { label: 'Explore', href: '#explore' },
//               ].map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2"
//                 >
//                   {item.label}
//                 </a>
//               ))}

//               {user && (
//                 <div className="pt-3 border-t border-white/10">
//                   <div className="flex items-center space-x-2 pb-3">
//                     {user.avatar ? (
//                       <img
//                         src={user.avatar}
//                         alt={user.name}
//                         className="h-8 w-8 rounded-full object-cover ring-2 ring-cyan-400/50"
//                       />
//                     ) : (
//                       <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
//                         <User className="h-5 w-5 text-white" />
//                       </div>
//                     )}
//                     <span className="text-sm font-medium text-gray-200">{user.name}</span>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors py-2"
//                   >
//                     <LogOut className="h-5 w-5" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// };

// export default Layout;
import React, { ReactNode, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Globe, User, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logopng from "./dashboard/logo.png"
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "Dashboard", to: "/" },
    { label: "My Trips", to: "/trips" },
    { label: "Explore", to: "/popular" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-xl shadow-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="relative">
                <Globe className="h-8 w-8 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text" />
                <div className="absolute inset-0 h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-30"></div>
              </div>
              
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                <img src={logopng} width="50px" height={"50px"} className="display :inline-block" alt="" />
               Triptastic
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {user && (
                <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-cyan-400/50"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-200">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-cyan-500/10"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-3 space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2"
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <div className="pt-3 border-t border-white/10">
                  <div
                    className="flex items-center space-x-2 pb-3 cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-cyan-400/50"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-200">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors py-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;

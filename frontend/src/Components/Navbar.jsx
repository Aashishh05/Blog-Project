import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-60 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/5 rounded-full blur-3xl"></div>
      </div>

      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-950 flex items-center justify-center font-bold text-white text-sm lg:text-base group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                B
              </div>

              <span className="font-bold text-xl lg:text-2xl text-slate-900 tracking-tight group-hover:text-cyan-600 transition-colors duration-300 ">
                TECHBLOG
              </span>
            </NavLink>

            <nav className="hidden lg:flex items-center gap-10 font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative group text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-cyan-600 font-semibold"
                      : "text-slate-700 hover:text-indigo-900"
                  }`
                }
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </NavLink>

              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `relative group text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-cyan-600 font-semibold"
                      : "text-slate-700 hover:text-indigo-900"
                  }`
                }
              >
                Blogs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative group text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-cyan-600 font-semibold"
                      : "text-slate-700 hover:text-indigo-900"
                  }`
                }
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </NavLink>

              <NavLink
                to="/liked"
                className={({ isActive }) =>
                  `relative group text-sm transition-colors duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-cyan-600 font-semibold"
                      : "text-slate-700 hover:text-indigo-900"
                  }`
                }
              >
                <FcLikePlaceholder size={20} />
                Liked Blogs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-full font-semibold text-sm hover:border-cyan-600 hover:text-cyan-600 transition-all duration-300"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-indigo-900 hover:shadow-lg hover:shadow-slate-900/40 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-900 transition-colors duration-300"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "max-h-96 py-4 border-t border-gray-200/50"
                : "max-h-0"
            }`}
          >
            <nav className="flex flex-col space-y-1">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm hover:bg-cyan-50"
              >
                Home
              </NavLink>

              <NavLink
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm hover:bg-cyan-50"
              >
                Blogs
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm hover:bg-cyan-50"
              >
                Contact
              </NavLink>

              <NavLink
                to="/liked"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm hover:bg-cyan-50"
              >
                Liked Blogs
              </NavLink>
            </nav>

            <div className="px-4 mt-4 pt-4 border-t border-gray-200/50 space-y-3">
              <NavLink
                to=""
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-2.5 border border-slate-300 text-slate-700 rounded-full font-semibold text-sm"
              >
                Login
              </NavLink>

              <NavLink
                to=""
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;

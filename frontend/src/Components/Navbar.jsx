import { FaBars, FaTimes, FaSignOutAlt, FaUser, FaCog } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearStorage } from "../Localstorage/storage";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    console.log(logout());
    clearStorage();
    setProfileMenuOpen(false);
    navigate("/");
  };

  const userRole = user?.role || "guest";

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", path: "/" },
      { label: "Blogs", path: "/blogs" },
      { label: "Contact", path: "/contact" },
    ];

    if (userRole === "user") {
      return [
        ...baseItems,
        { label: "Liked Blogs", path: "/liked", icon: true },
      ];
    }

    if (userRole === "admin") {
      return [
        { label: "Home", path: "/" },
        { label: "Blogs", path: "/blogdetails" },
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Categories", path: "/admin/categories" },
        { label: "Contact", path: "/contact" },
      ];
    }

    return [...baseItems];
  };

  const navItems = getNavItems();

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-60 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/5 rounded-full blur-3xl"></div>
      </div>

      <header className="fixed top-0 w-full z-50 backdrop-blur-md shadow-2xs bg-white/70 border border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-950 flex items-center justify-center font-bold text-white text-sm lg:text-base group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                B
              </div>
              <span className="font-bold text-xl lg:text-2xl text-slate-900 tracking-tight group-hover:text-cyan-600 transition-colors duration-300">
                TECHBLOG
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10 font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group text-sm transition-colors duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-cyan-600 font-semibold"
                        : "text-slate-700 hover:text-indigo-900"
                    }`
                  }
                >
                  {item.icon && <FcLikePlaceholder size={18} />}
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              ))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-3">
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-slate-200 hover:border-cyan-600 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-cyan-600 transition-colors">
                      {user?.fullName || "User"}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {user?.role || "user"}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 mt-1">
                          {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-slate-600">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>

                      <div className="py-2">
                        {userRole === "admin" && (
                          <NavLink
                            to="/admin/settings"
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200"
                          >
                            <FaCog size={16} />
                            Admin Settings
                          </NavLink>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-200 mt-2"
                        >
                          <FaSignOutAlt size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-900 transition-colors duration-300"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "max-h-96 py-4 border-t border-gray-200/50"
                : "max-h-0"
            }`}
          >
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm flex items-center gap-2 ${
                      isActive
                        ? "bg-cyan-50 text-cyan-700"
                        : "text-slate-700 hover:bg-cyan-50"
                    }`
                  }
                >
                  {item.icon && <FcLikePlaceholder size={16} />}
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="px-4 mt-4 pt-4 border-t border-gray-200/50 space-y-3">
              {!isLoggedIn ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-2.5 border border-slate-300 text-slate-700 rounded-full font-semibold text-sm hover:border-cyan-600 hover:text-cyan-600 transition-all duration-300"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-indigo-900 transition-all duration-300"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 bg-cyan-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      {user?.role || "user"}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {user?.fullName || "User"}
                    </p>
                  </div>

                  {userRole === "user" && (
                    <>
                      <NavLink
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-slate-700 rounded-lg hover:bg-cyan-50 transition-colors"
                      >
                        <FaUser size={16} />
                        My Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-slate-700 rounded-lg hover:bg-cyan-50 transition-colors"
                      >
                        <FaCog size={16} />
                        Settings
                      </NavLink>
                    </>
                  )}

                  {userRole === "admin" && (
                    <NavLink
                      to="/admin/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-slate-700 rounded-lg hover:bg-cyan-50 transition-colors"
                    >
                      <FaCog size={16} />
                      Admin Settings
                    </NavLink>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                  >
                    <FaSignOutAlt size={16} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;

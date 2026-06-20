import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { 
  FaBlog, FaTags, FaUsers, FaCog, FaSignOutAlt, 
  FaTachometerAlt, FaTimes 
} from "react-icons/fa";
import { logout } from "../redux/authSlice";
import { clearStorage } from "../Localstorage/storage";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    clearStorage();
    nav("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-45 transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-md border-r border-gray-200/60 flex flex-col shadow-xs ${
        sidebarOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="w-64 flex flex-col h-full">
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-950 flex items-center justify-center font-bold text-white text-sm shadow-md">
              B
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">TECHBLOG</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Main Menu
          </p>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "text-cyan-700 bg-cyan-600/10 border-l-[3px] border-cyan-600 rounded-l-none pl-2.5"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
              }`
            }
          >
            <FaTachometerAlt className="text-base" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "text-cyan-700 bg-cyan-600/10 border-l-[3px] border-cyan-600 rounded-l-none pl-2.5"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
              }`
            }
          >
            <FaBlog className="text-base" />
            <span>Blogs</span>
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "text-cyan-700 bg-cyan-600/10 border-l-[3px] border-cyan-600 rounded-l-none pl-2.5"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
              }`
            }
          >
            <FaTags className="text-base" />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "text-cyan-700 bg-cyan-600/10 border-l-[3px] border-cyan-600 rounded-l-none pl-2.5"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
              }`
            }
          >
            <FaUsers className="text-base" />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "text-cyan-700 bg-cyan-600/10 border-l-[3px] border-cyan-600 rounded-l-none pl-2.5"
                  : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
              }`
            }
          >
            <FaCog className="text-base" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100/70 transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@techblog.com</p>
            </div>
            <FaSignOutAlt className="text-slate-400 group-hover:text-red-500 transition-colors text-sm shrink-0" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
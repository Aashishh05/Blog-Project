import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBlog, FaUsers, FaThumbsUp, FaPlus, FaEye, FaEdit, FaTrash, FaBars } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-60 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/5 rounded-full blur-3xl" />
      </div>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

     
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 z-10 ${
        sidebarOpen ? "pl-64" : "pl-0"
      }`}>
        
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-xs">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors border border-gray-200 bg-white"
                >
                  <FaBars size={18} />
                </button>
              )}
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Overview</h1>
            </div>
            
            <button 
              onClick={() => nav(`/blogform`)}
              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-indigo-900 transition-all duration-300 shadow-sm"
            >
              <FaPlus size={11} />
              New Blog
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 space-y-8 max-w-6xl w-full mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-950 flex items-center justify-center text-white text-base shadow-inner shrink-0">
                <FaBlog />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">128</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5">Total Blogs</span>
                <span className="text-[11px] font-medium text-cyan-700 mt-1">+12 this month</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-cyan-700 flex items-center justify-center text-white text-base shadow-inner shrink-0">
                <FaUsers />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">3,421</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5">Total Users</span>
                <span className="text-[11px] font-medium text-cyan-700 mt-1">+84 this month</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-base shadow-inner shrink-0">
                <FaThumbsUp />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">9,870</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5">Total Likes</span>
                <span className="text-[11px] font-medium text-cyan-700 mt-1">+342 this week</span>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-base tracking-tight">Recent Activity</h2>
              <button className="text-xs font-semibold text-cyan-600 hover:text-indigo-900 transition-colors">
                View All Blogs →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-gray-100">
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/60">
                  <tr className="hover:bg-slate-50/40 transition-colors duration-150 group">
                    <td className="px-6 py-4 font-semibold text-slate-800 max-w-xs truncate">Getting Started with React 19</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">React</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">Jun 15, 2026</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                        published
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all"><FaEye size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><FaEdit size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"><FaTrash size={13} /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
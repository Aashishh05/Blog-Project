import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBlog,
  FaUsers,
  FaThumbsUp,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaBars,
  FaTag,
} from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/blog/get`),
        axios.get(`http://localhost:5000/api/category/get`),
      ]);

      setBlogs(blogsRes.data.blogs || []);
      setCategories(categoriesRes.data.categories || []);

      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (err) {
      console.log(err);
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalBlogs = blogs.length;
  const totalCategories = categories.length;
  const totalLikes = blogs.reduce(
    (sum, blog) => sum + (blog.likes?.length || 0),
    0,
  );
  const recentBlogs = blogs.slice(0, 5);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const StatSkeleton = () => (
    <div className="bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 flex items-center gap-4 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-slate-300" />
      <div className="flex flex-col flex-1">
        <div className="h-8 bg-slate-300 rounded w-20 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-24 mb-1" />
        <div className="h-3 bg-slate-200 rounded w-32" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden font-sans">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%);
          background-size: 1000px 100%;
          animation: shimmer 1s infinite;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(15px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-60 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/5 rounded-full blur-3xl" />
      </div>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 z-10 ${
          sidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-xs fade-in">
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
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Dashboard Overview
              </h1>
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

        <main className="flex-1 px-6 py-8 space-y-8 max-w-7xl w-full mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : (
              <>
                <div
                  className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300 fade-in group cursor-pointer"
                  onClick={() => nav("/admin/blogs")}
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-950 flex items-center justify-center text-white text-base shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                    <FaBlog />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      {totalBlogs}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5">
                      Total Blogs
                    </span>
                    <span className="text-[11px] font-medium text-cyan-700 mt-1">
                      Click to view all
                    </span>
                  </div>
                </div>

                <div
                  className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300 fade-in group cursor-pointer"
                  onClick={() => nav("/admin/categories")}
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-700 flex items-center justify-center text-white text-base shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                    <FaTag />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      {totalCategories}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5">
                      Total Categories
                    </span>
                    <span className="text-[11px] font-medium text-cyan-700 mt-1">
                      Click to manage
                    </span>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300 fade-in">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-base shadow-inner shrink-0">
                    <FaThumbsUp />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      {totalLikes}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5">
                      Total Likes
                    </span>
                    <span className="text-[11px] font-medium text-cyan-700 mt-1">
                      Across all blogs
                    </span>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-200 transition-all duration-300 fade-in">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-base shadow-inner shrink-0">
                    <span className="text-sm font-bold">💬</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      {blogs.reduce(
                        (sum, blog) => sum + (blog.comments?.length || 0),
                        0,
                      )}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5">
                      Total Comments
                    </span>
                    <span className="text-[11px] font-medium text-cyan-700 mt-1">
                      From readers
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {!loading && categories.length > 0 && (
            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xs overflow-hidden fade-in">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 text-base tracking-tight">
                  Categories
                </h2>
                <button
                  onClick={() => nav("/admin/categories")}
                  className="text-xs font-semibold text-cyan-600 hover:text-indigo-900 transition-colors"
                >
                  Manage All →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="p-4 rounded-xl bg-slate-50 border border-gray-200 hover:border-cyan-200 hover:bg-cyan-50 transition-all cursor-pointer group text-center"
                  >
                    <p className="font-semibold text-slate-900 text-sm group-hover:text-cyan-700">
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {
                        blogs.filter((b) => b.category?.name === cat.name)
                          .length
                      }
                      blogs
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xs overflow-hidden fade-in">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-base tracking-tight">
                Recent Blogs
              </h2>
              <button
                onClick={() => nav("/admin/blogs")}
                className="text-xs font-semibold text-cyan-600 hover:text-indigo-900 transition-colors"
              >
                View All Blogs →
              </button>
            </div>

            {loading ? (
              <div className="divide-y divide-gray-100/60">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="px-6 py-4 flex items-center gap-4 animate-pulse"
                  >
                    <div className="flex-1">
                      <div className="h-4 bg-slate-300 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-slate-200 rounded w-1/3" />
                    </div>
                    <div className="h-4 bg-slate-300 rounded w-20" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-gray-100">
                      <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Likes
                      </th>
                      <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/60">
                    {recentBlogs.length > 0 ? (
                      recentBlogs.map((blog) => (
                        <tr
                          key={blog._id}
                          className="hover:bg-slate-50/40 transition-colors duration-150 group"
                        >
                          <td className="px-6 py-4 font-semibold text-slate-800 max-w-xs truncate">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                              {blog.category?.name || "Uncategorized"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-xs">
                            {formatDate(blog.createdAt)}
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-xs font-semibold">
                            {blog.likes?.length || 0}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                              <button
                                onClick={() => nav(`/blogdetails/${blog._id}`)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all"
                                title="View"
                              >
                                <FaEye size={13} />
                              </button>
                              <button
                                onClick={() => nav(`/editblog/${blog._id}`)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                title="Edit"
                              >
                                <FaEdit size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this blog?",
                                    )
                                  ) {
                                    console.log("Delete blog:", blog._id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                title="Delete"
                              >
                                <FaTrash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-8 text-center text-slate-500"
                        >
                          No blogs yet. Create your first blog!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

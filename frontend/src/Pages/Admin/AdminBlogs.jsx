import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import { FaBars, FaSearch } from "react-icons/fa";
import axios from "axios";

const AdminBlogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [categoryRes, blogsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/category/get"),
        axios.get("http://localhost:5000/api/blog/get", { withCredentials: true }),
      ]);
      
      setCategory(categoryRes.data.categories || []);
      setBlogs(blogsRes.data.blogs || []);
      
      // Artifical delay matching dashboard structure for standard layout pacing
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (err) {
      console.log(err);
      setError("Failed to fetch articles and categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await window.confirm(
      "Are you sure want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/blog/delete/${id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setBlogs((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.log("Error deleting blog", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Custom Card Skeleton for Premium Grid Styling UI Loading Transitions
  const BlogCardSkeleton = () => (
    <div className="flex flex-col min-h-full rounded-2xl overflow-hidden bg-white border border-slate-200 animate-pulse">
      <div className="aspect-video bg-slate-200 animate-shimmer" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-3 bg-slate-200 rounded w-1/4 mb-4 animate-shimmer" />
        <div className="h-5 bg-slate-300 rounded w-3/4 mb-3 animate-shimmer" />
        <div className="h-3 bg-slate-200 rounded w-full mb-2 animate-shimmer" />
        <div className="h-3 bg-slate-200 rounded w-5/6 mb-5 animate-shimmer" />
        <div className="h-4 bg-slate-100 rounded w-12 pt-4 mb-5 animate-shimmer" />
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-9 bg-slate-200 rounded-lg animate-shimmer" />
          <div className="flex-1 h-9 bg-slate-200 rounded-lg animate-shimmer" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
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
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                Blogs
              </h1>
            </div>
          </div>
        </header>

        <section className="px-5 md:px-10 pt-16 md:pt-20 pb-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Manage Content
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[0.95] mt-3 mb-4 tracking-tight">
                All Articles
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Browse, edit, update, or remove articles from your blog.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 
                focus:outline-none focus:ring focus:ring-teal-500
                focus:border-slate-400 transition"
              />
            </div>
          </div>
        </section>

        <main className="px-5 md:px-10 max-w-5xl w-full mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 mb-6">
              {error}
            </div>
          )}

          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {loading ? (
                [1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="w-20 h-9 bg-slate-200 rounded-full animate-pulse animate-shimmer"
                  />
                ))
              ) : (
                category.map((cat) => (
                  <button
                    key={cat._id}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {loading ? (
                <>
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                </>
              ) : (
                blogs.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col min-h-full rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-300 hover:shadow-2xl fade-in"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={item.image?.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        {item.category?.name || "Uncategorized"}
                      </span>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        {item.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-4">
                        <Link
                          to="/blogdetails"
                          className="text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium"
                        >
                          View →
                        </Link>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                          onClick={() => nav(`/blogform/${item._id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="flex-1 px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBlogs;
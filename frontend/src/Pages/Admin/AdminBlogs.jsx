import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import { FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import axios from "axios";

const AdminBlogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const nav = useNavigate();

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/category/get`);
      setCategory(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/get`, {
        withCredentials: true,
      });
      console.log(res.data);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await window.confirm(
      "Are you sure want to delete this blog?",
    );

    if (!confirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/blog/delete/${id}`,
        { withCredentials: true },
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
    fetchCategory();
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 z-10 ${
          sidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
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
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                Blogs
              </h1>
            </div>
          </div>
        </header>

        <section className="px-5 md:px-10 pt-16 md:pt-20 pb-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left Content */}
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

            {/* Right Search Bar */}
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

        <section className="px-5 md:px-10">
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex flex-wrap gap-3">
              {category.map((cat) => (
                <button
                  key={cat._id}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}{" "}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {blogs.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col min-h-full rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-300 hover:shadow-2xl"
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
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminBlogs;

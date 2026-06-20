import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { FaBars } from "react-icons/fa";

const CATEGORIES = ["all", "technology", "design", "creativity"];

const STATIC_ARTICLES = [
  {
    id: 1,
    title: "The Future of Web Design",
    excerpt:
      "Exploring emerging trends, tools, and philosophies shaping how we design for the web.",
    category: "design",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Rethinking Component Architecture",
    excerpt: "Building scalable and maintainable component systems.",
    category: "technology",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Design Systems That Scale",
    excerpt: "Creating consistency across products and teams.",
    category: "design",
    readTime: "7 min read",
  },
];

const AdminBlogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
          <div className="max-w-5xl mx-auto">
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
        </section>

        <section className="px-5 md:px-10">
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === "all"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {STATIC_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col min-h-full rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-300 hover:shadow-2xl "
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-teal-600 mb-3">
                      {article.category}
                    </span>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-4">
                      <span className="text-xs text-slate-500">
                        {article.readTime}
                      </span>
                      <Link
                        to="/blogdetails"
                        className="text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium"
                      >
                        View →
                      </Link>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors">
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

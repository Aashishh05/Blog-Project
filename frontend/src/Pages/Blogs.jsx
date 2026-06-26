import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  
  // Dropdown search states
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceTimer = useRef(null);

  const calculateReadingTime = (content) => {
    if (!content) return "1 min";
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  // Fetch all blogs and categories on mount
  const fetchData = async () => {
    setLoading(true);
    try {
      const res_categories = await axios.get(
        `http://localhost:5000/api/category/get`,
      );
      const res_blogs = await axios.get(`http://localhost:5000/api/blog/get`);

      setCategory(res_categories.data.categories);
      setBlogs(res_blogs.data.blogs);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle dropdown search with debouncing
  const handleSearch = async (query) => {
    setSearchQuery(query);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setSearchLoading(true);

    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blog/search?search=${query}`
        );
        setSearchResults(res.data.blogs || []);
        setShowDropdown(true);
      } catch (err) {
        console.log("Search error:", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300); // 300ms debounce
  };

  // Handle selecting a blog from dropdown
  const handleSelectBlog = (blog) => {
    setSearchQuery("");
    setShowDropdown(false);
    setSearchResults([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".search-container") === null) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter blogs based on active category and local search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "all" || blog.category?.name === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        .pulse-slow {
          animation: pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
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
      <Navbar />
      <section className="px-5 md:px-10 pt-16 md:pt-24 pb-12 border-b border-slate-100 fade-in">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left Content */}
          <div>
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest block mb-3">
              Our Archive
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
              All Articles
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Deep dives, essays, and guides on building for the modern web,
              pixel-perfect design, and creative workflows.
            </p>
          </div>

          {/* Right Search Bar with Dropdown */}
          <div className="relative w-full md:w-80 search-container">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) {
                    setShowDropdown(true);
                  }
                }}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
              />

              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />

              {/* Dropdown Results */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchLoading ? (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((blog) => (
                        <Link
                          key={blog._id}
                          to={`/blogdetails/${blog._id}`}
                          state={{ blog: blog }}
                          onClick={() => handleSelectBlog(blog)}
                          className="block"
                        >
                          <div className="w-full text-left p-4 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100 last:border-b-0">
                            <div className="flex items-start gap-3">
                              {blog.image?.url && (
                                <img
                                  src={blog.image.url}
                                  alt={blog.title}
                                  className="w-12 h-12 rounded object-cover flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-900 text-sm truncate">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-slate-500 truncate mt-1">
                                  {blog.subtitle}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs font-medium text-teal-600">
                                    {blog.category?.name || "Uncategorized"}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    {calculateReadingTime(blog.content)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No articles found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pt-10 pb-6 bg-slate-50/50 fade-in">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            {category.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.name
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-16">
        <div className="max-w-5xl mx-auto pb-24">
          {loading ? (
            <div>
              <div className="flex justify-center items-center gap-2 mb-12">
                <div className="w-3 h-3 bg-teal-600 rounded-full pulse-slow" />
                <p className="text-slate-500 font-medium">
                  Loading articles...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl overflow-hidden bg-white border border-slate-200 flex flex-col h-full"
                  >
                    <div className="aspect-video bg-gradient-to-r from-slate-300 to-slate-400 animate-shimmer" />
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="h-3 bg-slate-300 rounded w-24 mb-3 animate-shimmer" />
                      <div className="h-6 bg-slate-300 rounded w-full mb-2 animate-shimmer" />
                      <div className="h-6 bg-slate-300 rounded w-5/6 mb-4 animate-shimmer" />
                      <div className="h-4 bg-slate-300 rounded w-full mb-2 animate-shimmer" />
                      <div className="h-4 bg-slate-300 rounded w-4/5 mb-6 animate-shimmer" />
                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <div className="h-3 bg-slate-300 rounded w-16 animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 fade-in">
              {filteredBlogs.map((item) => (
                <Link
                  key={item._id}
                  to={`/blogdetails/${item._id}`}
                  state={{ blog: item }}
                  className="group flex flex-col h-full"
                >
                  <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl flex flex-col h-full">
                    <div className="aspect-video relative overflow-hidden bg-slate-200">
                      <img
                        src={item.image?.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-teal-600">
                          {item.category?.name || "Uncategorized"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500 mb-3 font-medium">
                        {item.subtitle}
                      </p>

                      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-2">
                        {item.content}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-teal-600 transition-colors">
                          {calculateReadingTime(item.content)}
                        </span>
                        <span className="text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-300 text-lg">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                No articles found
              </h3>
              <p className="text-sm text-slate-500">
                Try tweaking your search keywords or choosing another category.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blogs;
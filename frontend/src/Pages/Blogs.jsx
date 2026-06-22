import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res_categories = await axios.get(
        `http://localhost:5000/api/category/get`,
      );
      const res_blogs = await axios.get(`http://localhost:5000/api/blog/get`);

      setCategory(res_categories.data.categories);
      setBlogs(res_blogs.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-slate-600">Loading...</p>
      </div>
    );
  }

  // Filter blogs based on active category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "all" || blog.category?.name === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="px-5 md:px-10 pt-16 md:pt-24 pb-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
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
      </section>

      <section className="px-5 md:px-10 pt-10 pb-6 bg-slate-50/50">
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

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
            />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-16">
        <div className="max-w-5xl mx-auto pb-24">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
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

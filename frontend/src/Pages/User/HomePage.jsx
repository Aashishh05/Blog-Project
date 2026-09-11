import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Stories");

  const user = null;

  const blogfetch = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/getblog", { withCredentials: true });
      setBlogs(res.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryfetch = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/getdata", { withCredentials: true });
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blogfetch();
    categoryfetch();
  }, []);

  const featuredBlog = blogs[0];
  const secondaryBlogs = blogs.slice(1, 3);
  const remainingBlogs = blogs.slice(3);

  return (
    <div className="min-h-screen bg-[#f4f6fb] font-sans">
      <title>Home — TechBlog</title>

      {/* ── HERO ── */}
      <section className="px-5 md:px-10 pt-8 pb-10">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left copy */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="text-[11px] font-semibold tracking-widest text-cyan-500 uppercase mb-5">
                Featured Insight
              </span>
              <h1 className="text-5xl md:text-6xl font-black leading-[1.08] text-slate-900 mb-5">
                Insights<br />
                for the<br />
                <span className="text-cyan-500">Modern<br />Mind</span>
              </h1>
              <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-sm">
                Exploring the intersection of deep technology, architectural minimalism, and the future of digital creativity.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-900 transition-colors duration-200"
                >
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  to="/blogs"
                  className="text-slate-600 font-semibold text-sm hover:text-slate-900 transition-colors duration-200"
                >
                  Browse All
                </Link>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 min-h-[320px] flex items-center justify-center overflow-hidden">
              {/* Abstract lines art */}
              <div className="w-64 h-48 rounded-2xl bg-slate-800/90 flex items-center justify-center shadow-2xl">
                <div className="flex flex-col gap-2 w-40">
                  {[100, 72, 88, 58, 80, 65].map((w, i) => (
                    <span
                      key={i}
                      className="block h-[3px] rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-90"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Weekly badge */}
              <span className="absolute top-5 right-5 bg-cyan-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                Weekly Updates
              </span>

              {/* Newsletter pill */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-full px-4 py-2 flex items-center gap-3 text-xs whitespace-nowrap shadow-lg">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="white" strokeWidth="1.8"/>
                  <path d="M2 8l10 6 10-6" stroke="white" strokeWidth="1.8"/>
                </svg>
                Join the Newsletter
                <span className="text-white/40">·</span>
                <span className="text-white/40">your@email.com</span>
                <span className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center ml-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {["All Stories", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-sm"
                  : "bg-white text-slate-600 border-gray-200 hover:border-cyan-400 hover:text-cyan-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN BLOG GRID ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pb-16">
        {blogs.length === 0 ? (
          /* Skeleton state */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="lg:row-span-2 rounded-3xl bg-white border border-gray-100 overflow-hidden animate-pulse">
              <div className="bg-slate-200 h-64 lg:h-full min-h-[340px]" />
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="rounded-3xl bg-white border border-gray-100 overflow-hidden flex animate-pulse">
                <div className="bg-slate-200 w-36 flex-shrink-0" />
                <div className="p-5 flex-1 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-4/5" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Top grid: 1 big + 2 small */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

              {/* Featured large card */}
              {featuredBlog && (
                <Link
                  to={`/blog/${featuredBlog._id}`}
                  className="lg:row-span-2 group rounded-3xl overflow-hidden relative block bg-slate-900 min-h-[360px] hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={`http://localhost:4000/uploads/${featuredBlog.image}`}
                    alt={featuredBlog.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 block">
                      {featuredBlog.category || "Insight"}
                    </span>
                    <h2 className="text-2xl font-black text-white leading-tight mb-4 line-clamp-3">
                      {featuredBlog.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-slate-900">
                        {featuredBlog.author?.charAt(0) || "A"}
                      </div>
                      <span className="text-white/60 text-xs">
                        {featuredBlog.author || "Author"} — {featuredBlog.readTime || "5 Min Read"}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Two secondary cards */}
              <div className="flex flex-col gap-5">
                {secondaryBlogs.map((item) => (
                  <Link
                    key={item._id}
                    to={`/blog/${item._id}`}
                    className="group bg-white rounded-3xl border border-gray-100 overflow-hidden flex hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-36 flex-shrink-0 overflow-hidden bg-slate-100">
                      <img
                        src={`http://localhost:4000/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-[11px] font-bold tracking-widest text-cyan-500 uppercase block mb-2">
                          {item.category || "Workflow"}
                        </span>
                        <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700">
                          {item.author?.charAt(0) || "A"}
                        </div>
                        <span className="text-slate-400 text-[11px]">
                          {item.author || "Author"} · {item.date || "Recent"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Skeleton if fewer than 2 secondary blogs */}
                {secondaryBlogs.length < 2 && (
                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex animate-pulse">
                    <div className="bg-slate-100 w-36 flex-shrink-0 min-h-[120px]" />
                    <div className="p-5 flex-1 space-y-3">
                      <div className="h-3 bg-slate-100 rounded w-1/3" />
                      <div className="h-4 bg-slate-100 rounded w-4/5" />
                      <div className="h-3 bg-slate-100 rounded w-2/3" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Remaining blogs — 3-column grid */}
            {remainingBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {remainingBlogs.map((item) => (
                  <Link
                    key={item._id}
                    to={`/blog/${item._id}`}
                    className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
                  >
                    <div className="overflow-hidden bg-slate-100 h-48">
                      <img
                        src={`http://localhost:4000/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[11px] font-bold tracking-widest text-cyan-500 uppercase mb-2">
                        {item.category || "Article"}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 line-clamp-2 flex-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                            {item.author?.charAt(0) || "A"}
                          </div>
                          <span className="text-slate-400 text-xs">{item.author || "Author"}</span>
                        </div>
                        <span className="text-xs text-cyan-500 font-semibold group-hover:underline">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── CTA ── */}
      {!user && (
        <section className="px-5 md:px-10 pb-16">
          <div className="max-w-6xl mx-auto bg-slate-900 rounded-3xl px-10 py-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-4 block">
              Join the Community
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight relative z-10">
              Start Your<br />
              <span className="text-cyan-400">Blogging Journey</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8 leading-relaxed relative z-10">
              Share your thoughts, inspire people, and become part of our growing creative community.
            </p>
            <Link
              to="/signup"
              className="relative z-10 inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors duration-200 shadow-lg shadow-cyan-500/30"
            >
              Create Account
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Homepage;
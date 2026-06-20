import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "technology", "design", "creativity"];

  const articles = [
    {
      id: 2,
      title: "Rethinking Component Architecture",
      excerpt: "Building scalable and maintainable component systems.",
      category: "technology",
      readTime: "6 min read",
      date: "June 18, 2026",
    },
    {
      id: 3,
      title: "Design Systems That Scale",
      excerpt: "Creating consistency across products and teams.",
      category: "design",
      readTime: "7 min read",
      date: "June 14, 2026",
    },
    {
      id: 4,
      title: "The Intersection of Art and Code",
      excerpt: "How creative thinking enhances technical solutions.",
      category: "creativity",
      readTime: "5 min read",
      date: "June 10, 2026",
    },
    {
      id: 5,
      title: "Accessibility in Modern Web Apps",
      excerpt: "Building inclusive experiences for everyone.",
      category: "technology",
      readTime: "9 min read",
      date: "May 28, 2026",
    },
    {
      id: 6,
      title: "Typography Matters: A Deep Dive",
      excerpt: "The art and science of choosing the right typeface.",
      category: "design",
      readTime: "6 min read",
      date: "May 15, 2026",
    },
    {
      id: 7,
      title: "Remote Collaboration Best Practices",
      excerpt: "Tools and workflows for distributed creative teams.",
      category: "creativity",
      readTime: "7 min read",
      date: "May 02, 2026",
    },
  ];

  // Filter logic based on Category and Search Query
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <section className="px-5 md:px-10 pt-16 md:pt-24 pb-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest block mb-3">
            Our Archive
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            All Articles
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Deep dives, essays, and guides on building for the modern web, pixel-perfect design, and creative workflows.
          </p>
        </div>
      </section>

      {/* Controls Section (Filters & Search) */}
      <section className="px-5 md:px-10 pt-10 pb-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Input */}
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

      {/* Articles Grid */}
      <section className="px-5 md:px-10 py-16">
        <div className="max-w-5xl mx-auto pb-24">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blogdetails`}
                  className="group flex flex-col h-full"
                >
                  {/* Card Container */}
                  <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl flex flex-col h-full">
                    
                    {/* Image Placeholder */}
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      {/* Meta (Category & Date) */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-teal-600">
                          {article.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {article.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-500">
                          {article.readTime}
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
            /* Empty State */
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No articles found</h3>
              <p className="text-sm text-slate-500">Try tweaking your search keywords or choosing another category.</p>
            </div>
          )}
        </div>
      </section>
     <Footer />
    </div>
  );
};

export default Blogs;
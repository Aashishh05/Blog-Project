import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const Homepage = () => {
  const nav = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [category, setCategory] = useState([]);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const category_res = await axios.get(
        `http://localhost:5000/api/category/get`,
      );
      const blog_res = await axios.get(`http://localhost:5000/api/blog/get`);

      setCategory(category_res.data.categories);
      setBlog(blog_res.data.blogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Cannot fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBlogs =
    activeCategory === "all"
      ? blog
      : blog.filter((item) => item.category === activeCategory);

  const featuredArticle = {
    id: 1,
    title: "The Future of Web Design",
    excerpt:
      "Exploring emerging trends, tools, and philosophies shaping how we design for the web.",
    category: "design",
    readTime: "8 min read",
    image: "bg-gradient-to-br from-slate-100 to-slate-200",
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="px-5 md:px-10 pt-16 md:pt-24 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Welcome to TechBlog
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-[0.95] mb-6 tracking-tight">
            Ideas that
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-700">
              shape culture
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Thoughtful essays on technology, design, and creativity, written
            from my journey of building and learning in public.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/blogs"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Start Reading
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              Join Today
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-12 md:py-20 bg-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-indigo-900 to-indigo-950 text-white shadow-md">
              Featured
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-white text-teal-600 text-xs font-semibold rounded-full border border-teal-200">
                  {featuredArticle.category}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {featuredArticle.title}
              </h2>

              <div className="w-12 h-1 bg-teal-600 rounded-full mb-6" />

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to="/blogdetails"
                  className="font-semibold text-slate-900 hover:text-teal-600 transition-colors flex items-center gap-2"
                >
                  Read Article
                  <span className="text-xl">→</span>
                </Link>
                <span className="text-sm text-slate-500">
                  {featuredArticle.readTime}
                </span>
              </div>
            </div>

            <div
              className={`hidden lg:block w-full aspect-square rounded-2xl ${featuredArticle.image}`}
            />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {category.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto pb-24">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-slate-500">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-slate-500">
                No articles found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
          )}
        </div>
      </section>

      <section className="px-5 md:px-10 py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Start your journey today
          </h2>

          <p className="text-lg text-slate-300 mb-8">
            discover great content, bookmark what you love, <br /> and connect
            with writers who inspire you.
          </p>

          <div className="px-33 flex flex-col sm:flex-row gap-6">
            <button
              type="submit"
              className="p-4 bg-teal-600 text-white font-semibold rounded-2xl hover:bg-teal-700 transition-colors whitespace-nowrap"
              onClick={() => nav("/signup")}
            >
              Create Free Account
            </button>
            <button
              type="submit"
              className="p-4 border border-teal-600 text-white font-semibold rounded-2xl hover:bg-teal-600 transition-colors whitespace-nowrap"
              onClick={() => nav("/login")}
            >
              Already Have an Account?
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;

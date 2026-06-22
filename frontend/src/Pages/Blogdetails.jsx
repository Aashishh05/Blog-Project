import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegComment, FaArrowLeft } from "react-icons/fa6";
import { Link, useParams, useLocation } from "react-router-dom";
import { IoShareOutline } from "react-icons/io5";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  const fetchBlog = async () => {
    setLoading(true);
    try {
      if (location.state?.blog) {
        setBlog(location.state.blog);
      } else {
        const res = await axios.get(`http://localhost:5000/api/blog/get/${id}`);
        setBlog(res.data.blog);
        console.log(res.data.blog);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id, location]);

  if (loading || !blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-16 text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  const readTime =
    Math.ceil(blog.content?.split(" ").length / 200) + " min read";
  const publishedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="max-w-3xl mx-auto px-5 md:px-10 py-12 md:py-16">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition group"
        >
          <FaArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition"
          />
          <span className="text-sm font-medium">Back to all articles</span>
        </Link>

        <div className="mb-12">
          <div className="mb-4">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full inline-block">
              {blog.category?.name || "Technology"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-200 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                {blog.author?.fullName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {blog.author?.fullName}
                </p>
                <p className="text-xs text-slate-500">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <span>{publishedDate}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>

        <div className="mb-12 -mx-5 md:-mx-10">
          <div className="relative h-96 overflow-hidden rounded-xl">
            <img
              src={blog.image?.url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        <p className="text-xl text-slate-600 mb-8 italic leading-relaxed">
          {blog.subtitle}
        </p>

        <div className="prose prose-lg max-w-none text-slate-700 mb-16">
          <style>{`
            .prose h2 {
              font-size: 1.875rem;
              font-weight: 700;
              color: #0f172a;
              margin-top: 2rem;
              margin-bottom: 1rem;
              letter-spacing: -0.025em;
            }
            .prose p {
              line-height: 1.8;
              color: #475569;
              margin-bottom: 1.5rem;
            }
          `}</style>
          <p className="text-slate-700 leading-relaxed">{blog.content}</p>
        </div>

        <div className="py-8 border-t border-b border-slate-200 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <FaRegHeart size={16} />
              <span>10</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <FaRegComment size={16} />
              <span>20</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <IoShareOutline size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12">
          <h3 className="text-xs font-bold text-slate-900 mb-6 tracking-widest uppercase">
            About Author
          </h3>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {blog.author?.fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 mb-1 text-lg">
                {blog.author?.fullName}
              </h4>
              <p className="text-sm text-teal-600 font-semibold mb-3">Author</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {blog.author?.email}
              </p>
              <button className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition flex items-center gap-1">
                Follow <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 mb-16">
          <h3 className="text-xs font-bold text-slate-900 mb-4 tracking-widest uppercase">
            Share This Article
          </h3>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition flex items-center justify-center text-sm font-semibold">
              𝕏
            </button>
            <button className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 transition flex items-center justify-center">
              in
            </button>
            <button className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200 transition flex items-center justify-center text-lg">
              ✓
            </button>
          </div>
        </div>
      </article>

      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to stay updated?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Subscribe to get the latest articles on web development, design, and
            coding insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 placeholder-slate-500 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-700"
            />
            <button className="px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;

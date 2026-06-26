import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";


const LikedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeBlogID, setLikeBlogID] = useState(new Set());
  const [likeLoading, setLikeLoading] = useState({});
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  const fetchLikedBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:5000/api/likedblog/liked", {
        withCredentials: true,
      });

      const blogsData = res.data.blogs || [];
      setBlogs(blogsData);
      console.log(blogsData);

      const likedIds = new Set(blogsData.map((b) => b._id));
      setLikeBlogID(likedIds);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load liked blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (likeLoading[blogId]) return;

    setLikeLoading((prev) => ({ ...prev, [blogId]: true }));

    try {
      const res = await axios.post(
        `http://localhost:5000/api/likedblog/like/${blogId}`,
        {},
        { withCredentials: true }
      );

      const isLiked = res.data.liked;

      setLikeBlogID((prev) => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.add(blogId);
        } else {
          newSet.delete(blogId);
          setBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== blogId)
          );
        }
        return newSet;
      });

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, likeCount: res.data.likeCount }
            : blog
        )
      );
    } catch (err) {
      console.log("Error liking blog:", err);
      alert(err.response?.data?.message || "Failed to update like");
    } finally {
      setLikeLoading((prev) => {
        const updated = { ...prev };
        delete updated[blogId];
        return updated;
      });
    }
  };

  useEffect(() => {
    fetchLikedBlogs();
  }, []);

  const SkeletonLoader = () => (
    <div className="space-y-4">
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(226, 232, 240, 0.3),
            rgba(226, 232, 240, 0.5),
            rgba(226, 232, 240, 0.3)
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="skeleton rounded-2xl overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="h-52 bg-slate-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
              <div className="h-6 w-full bg-slate-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-3 w-40 bg-slate-200 rounded"></div>
                </div>
                <div className="h-10 w-20 bg-slate-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="px-5 md:px-10 py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-slate-900">
              Liked Blogs
            </h1>
            <SkeletonLoader />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="px-5 md:px-10 py-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-slate-900">
              Liked Blogs
            </h1>
            <div className="flex justify-center items-center h-64 bg-red-50 border border-red-200 rounded-2xl">
              <div className="text-center">
                <p className="text-red-600 text-lg font-medium">{error}</p>
                <button
                  onClick={fetchLikedBlogs}
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      <section className="px-5 md:px-10 py-12">
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}</style>

        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900">Liked Blogs</h1>
            <p className="text-slate-600 mt-2">
              {blogs.length} blog{blogs.length !== 1 ? "s" : ""} Liked
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl border border-teal-100 backdrop-blur-sm">
              <svg
                className="w-16 h-16 text-teal-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className="text-slate-600 text-lg font-medium">
                No liked blogs yet
              </p>
              <p className="text-slate-500 mt-1 text-sm">
                Start liking blogs to save them here
              </p>
              <Link
                to="/blogs"
                className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
              >
                Explore Blogs
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="fade-in bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-teal-100/50 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    {blog.image?.url ? (
                      <img
                        src={blog.image.url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-slate-100">
                        <svg
                          className="w-12 h-12 text-teal-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      Liked
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                      {blog.category?.name || blog.category || "Uncategorized"}
                    </span>

                    <h2 className="text-lg font-bold mt-3 line-clamp-2 text-slate-900">
                      {blog.title}
                    </h2>

                    <p className="text-slate-600 mt-2 line-clamp-2 text-sm leading-relaxed">
                      {blog.subtitle || blog.description || "No description"}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-slate-400 flex items-center justify-center text-white text-xs font-bold">
                          {blog.author?.fullName?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">
                            {blog.author?.fullName || "Anonymous"}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {blog.author?.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 items-center">
                        <Link
                          to={`/blogdetails/${blog._id}`}
                          className="flex-1 px-3 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition duration-200 text-center"
                        >
                          Read
                        </Link>

                        <button
                          onClick={() => handleLike(blog._id)}
                          disabled={likeLoading[blog._id]}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
                            likeBlogID.has(blog._id)
                              ? "bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-60"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-60"
                          } ${
                            likeLoading[blog._id]
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          title={
                            likeBlogID.has(blog._id)
                              ? "Unlike this blog"
                              : "Like this blog"
                          }
                        >
                          {likeLoading[blog._id] ? (
                            <svg
                              className="w-4 h-4 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          ) : likeBlogID.has(blog._id) ? (
                            <FaHeart size={14} />
                          ) : (
                            <FaRegHeart size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LikedBlogs;
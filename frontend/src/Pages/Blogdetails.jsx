import React, { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaArrowLeft,
  FaPenToSquare,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoShareOutline } from "react-icons/io5";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [likeBlogID, setLikeBlogID] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [Likecount, setLikeCount] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
console.log(id)
  // Fetch blog data
 const fetchBlog = async () => {
  setLoading(true);
  try {
    const res = await axios.get(
      `http://localhost:5000/api/blog/get/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(res)
    setBlog(res.data.blog);
    setLikeCount(res.data.likeCount);
  } catch (error) {
    console.log("Error fetching blog:", error);
  } finally {
    setLoading(false);
  }
};
  // Fetch all liked blogs
  const fetchLikedBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/likedblog/liked", {
        withCredentials: true,
      });
      const likedBlogIds = new Set((res.data.blogs || []).map((b) => b._id));
      setLikeBlogID(likedBlogIds);
    } catch (error) {
      console.log("Error fetching liked blogs:", error);
    }
  };

  // Like/Unlike blog
  const handleLike = async () => {
    if (!user) {
      alert("Please login first");
      setTimeout(() => nav(`/login`), 1000);
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/likedblog/like/${id}`,
        {},
        { withCredentials: true },
      );

      const isLiked = res.data.liked;
      const newLikeCount = res.data.likeCount;
      console.log(newLikeCount)
      setLikeCount(res.data.likeCount)

      // Update liked set
      setLikeBlogID((prev) => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });

      // Update like count in blog
      setBlog((prev) => ({
        ...prev,
        likecount: newLikeCount,
      }));
    } catch (error) {
      console.log("Error liking blog:", error);
      alert("Failed to like blog. Please try again.");
    } finally {
      setLikeLoading(false);
    }
  };
  console.log(Likecount)

  // Fetch comments for the blog
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/blog/${id}`,
        { withCredentials: true },
      );
      setComments(res.data.comments);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      setTimeout(() => nav(`/login`), 1000);
      return;
    }
    if (!newComment.trim()) return;
    if (commentLoading) return;
    setCommentLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments/create",
        { blogId: id, comment: newComment },
        { withCredentials: true },
      );
      const added = res.data.comment;
      setComments((prev) => [
        { ...added, user: { ...user, _id: user.id } },
        ...prev,
      ]);
      setNewComment("");
    } catch (error) {
      console.log("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  // Start editing a comment
  const handleEditStart = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.comment);
  };

  // Save edited comment
  const handleEditSave = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/update/${commentId}`,
        { comment: editText },
        { withCredentials: true },
      );
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, comment: res.data.comment.comment } : c,
        ),
      );
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.log("Error updating comment:", error);
      alert("Failed to update comment.");
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/comments/delete/${commentId}`,
        { withCredentials: true },
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.log("Error deleting comment:", error);
      alert("Failed to delete comment.");
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchLikedBlogs();
    fetchComments();
  }, [id]);

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
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
                likeBlogID.has(id)
                  ? "bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-60"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-60"
              } ${likeLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {likeBlogID.has(id) ? (
                <FaHeart size={16} />
              ) : (
                <FaRegHeart size={16} />
              )}
              <span>{Likecount}</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <FaRegComment size={16} />
              <span>{comments.length}</span>
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

        <div className="mb-16">
          <h3 className="text-xs font-bold text-slate-900 mb-6 tracking-widest uppercase">
            Comments ({comments.length})
          </h3>

          <form
            onSubmit={handleAddComment}
            className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-8"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none mb-4"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={commentLoading || !newComment.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={14} />
                {commentLoading ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>

          {comments.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <FaRegComment size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm text-slate-500">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white rounded-2xl p-5 border border-slate-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {comment.user?.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 text-sm">
                            {comment.user?.fullName}
                          </p>
                          <span className="text-xs text-slate-400">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        {user &&
                          (comment.user?._id === user.id || comment.user?.id === user.id) &&
                          editingId !== comment._id && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditStart(comment)}
                                className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition"
                                title="Edit comment"
                              >
                                <FaPenToSquare size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete comment"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          )}
                      </div>

                      {editingId === comment._id ? (
                        <div>
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none mb-2"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditSave(comment._id)}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {comment.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

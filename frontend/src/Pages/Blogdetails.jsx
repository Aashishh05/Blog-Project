import React from 'react';
import { 
  FaRegHeart, 
  FaRegComment, 
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoShareOutline, IoTimeOutline, IoMailOutline } from 'react-icons/io5';
import Navbar from '../Components/Navbar';

const BlogDetail = () => {
  const blog = {
    id: 1,
    title: "How we reduced hallucination rates by 12% in our AI model",
    description: "Exploring the intersection of deep technology, architectural evolution, and the future of digital creativity.",
    author: {
      name: "Aashish Shrestha",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "Full Stack Developer"
    },
    publishedDate: "June 14, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop",
    likes: 324,
    comments: 42,
    content: `
      <p>When we started the Pro 2.1 research cycle, the clearest signal from beta users was consistent: outputs were good on straightforward tasks but degraded noticeably on complex, multi-step documents.</p>
      
      <h2>Where the problem actually lived</h2>
      
      <p>Our initial hypothesis was temperature-related. Lowering it should reduce randomness and therefore reduce hallucination. It did not. Lower temperature produced more consistent outputs but not more accurate ones – the model would simply commit to a wrong answer more firmly.</p>
      
      <p>The real issue was on us. When we traced the model's reasoning in multi-step documents, the model was placing too much weight on the first relevant passage it encountered and not sufficiently re-evaluating that weight as it processed subsequent content.</p>
      
      <h2>The results</h2>
      
      <p>After implementing context re-weighting across the inference pipeline, we saw a 12% reduction in hallucination rates on our benchmark test suite. More importantly, users reported significantly higher confidence in the model's outputs on complex documents.</p>
      
      <p>This wasn't a silver bullet. We continue to see edge cases where the model struggles with extremely long documents or contradictory source material. But for the vast majority of user workflows, this update represents a meaningful step forward in reliability.</p>
      
      <h2>What's next</h2>
      
      <p>The next phase of research focuses on improving the model's ability to acknowledge uncertainty. Rather than committing firmly to potentially incorrect outputs, we're exploring ways for the model to signal when it's operating at the edges of its confidence boundaries.</p>
    `
  };

  const relatedArticles = [
    {
      id: 2,
      title: "The Art of Reduction: Why Less is More in UI Design",
      category: "DESIGN",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      author: "Aashish Shrestha",
      readTime: "12 min read",
      date: "June 12, 2026"
    },
    {
      id: 3,
      title: "Optimizing React 19 for High-Performance Dashboards",
      category: "TECHNOLOGY",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
      author: "Aashish Shrestha",
      readTime: "8 min read",
      date: "June 10, 2026"
    },
    {
      id: 4,
      title: "Generative Art: The New Frontier of Web Assets",
      category: "CREATIVITY",
      image: "https://images.unsplash.com/photo-1547887537-cb26c8a902f5?w=400&h=250&fit=crop",
      author: "Aashish Shrestha",
      readTime: "10 min read",
      date: "June 8, 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
    <Navbar />

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-5 md:px-10 py-12 md:py-16">
        <Link 
          to="/blogs"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition group"
        >
          <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition" />
          <span className="text-sm font-medium">Back to all articles</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          {/* Category */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full inline-block">
              Technology
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-200 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900">{blog.author.name}</p>
                <p className="text-xs text-slate-500">{blog.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <span>{blog.publishedDate}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12 -mx-5 md:-mx-10">
          <div className="relative h-96 overflow-hidden rounded-xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Content */}
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
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Engagement */}
        <div className="py-8 border-t border-b border-slate-200 mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <FaRegHeart size={16} />
              <span>{blog.likes}</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <FaRegComment size={16} />
              <span>{blog.comments}</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-medium">
              <IoShareOutline size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12">
          <h3 className="text-xs font-bold text-slate-900 mb-6 tracking-widest uppercase">About Author</h3>
          <div className="flex items-start gap-6">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 mb-1 text-lg">{blog.author.name}</h4>
              <p className="text-sm text-teal-600 font-semibold mb-3">{blog.author.role}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Full stack developer passionate about exploring the intersection of technology, design, and human creativity. Building the future of web and sharing insights along the way.
              </p>
              <button className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition flex items-center gap-1">
                Follow <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="border-t border-slate-200 pt-8 mb-16">
          <h3 className="text-xs font-bold text-slate-900 mb-4 tracking-widest uppercase">Share This Article</h3>
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

      {/* Newsletter Section */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to stay updated?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Subscribe to get the latest articles on web development, design, and coding insights.
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

      {/* Related Articles */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="mb-12">
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Related</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-3">More from our blog</h2>
          <p className="text-slate-600">Continue reading thoughtful essays on technology and design</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="group flex flex-col h-full"
            >
              {/* Card */}
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category */}
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-teal-600 mb-3">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
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
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-5 md:px-10 py-14">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">TechBlog</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Sharing modern web development insights, tutorials, and real-world coding experiences.
              </p>

              {/* Social */}
              <div className="flex gap-4 mt-5 text-slate-600">
                <a href="https://x.com/_Aashish_10" className="hover:text-teal-600 transition text-sm">Twitter</a>
                <a href="https://www.linkedin.com/in/aashish-shrestha-32ab14366/" className="hover:text-teal-600 transition text-sm">LinkedIn</a>
                <a href="https://github.com/Aashishh05" className="hover:text-teal-600 transition text-sm">GitHub</a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Explore</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link to="/" className="hover:text-slate-900">All Articles</Link></li>
                <li><a href="#" className="hover:text-slate-900">Categories</a></li>
                <li><a href="#" className="hover:text-slate-900">Trending</a></li>
                <li><a href="#" className="hover:text-slate-900">Latest Posts</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">About</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Subscribe</h4>
              <p className="text-sm text-slate-600 mb-4">
                Get the latest posts delivered to your inbox.
              </p>

              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} TechBlog. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
              <a href="#" className="hover:text-slate-900">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BlogDetail;
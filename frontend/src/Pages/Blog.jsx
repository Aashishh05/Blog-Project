import React from "react";
import {
  Share2,
  Heart,
  MessageCircle,
  ArrowRight,
  Mail,
  Clock,
  User,
  Calendar,
} from "lucide-react";

export default function Blog() {
  const blog = {
    id: 1,
    title: "Insights for the Modern Mind",
    category: "FEATURED INSIGHT",
    description:
      "Exploring the intersection of deep technology, architectural evolution, and the future of digital creativity.",
    author: {
      name: "Erik V.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "Tech Writer",
    },
    publishedDate: "June 14, 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop",
    likes: 324,
    comments: 42,
    content: `
      <p>The intersection of technology and creativity has never been more exciting. As we navigate the rapidly evolving landscape of web development, artificial intelligence, and digital design, we find ourselves at the forefront of a revolution that's reshaping how we think about building for the web.</p>
      
      <h2 style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 700;">The Evolution of Modern Architecture</h2>
      
      <p>Modern web architecture has evolved significantly over the past decade. What started as simple static sites has transformed into complex, interactive applications that rival native experiences. The rise of frameworks like React, Vue, and Svelte has democratized sophisticated UI development, allowing developers to create stunning interfaces with unprecedented ease.</p>
      
      <p>But architecture isn't just about frameworks. It's about understanding the fundamental principles of scalability, performance, and maintainability. Today's developers must consider not just how to build, but how to build in a way that scales with user demands and technological change.</p>
      
      <h2 style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 700;">Embracing Minimalism in Design</h2>
      
      <p>One of the most significant trends we're seeing is the shift towards minimalism. Less is more has become more than just a design philosophy—it's a practical necessity. Users are overwhelmed with information, and clarity has become a competitive advantage.</p>
      
      <p>Minimalist design doesn't mean boring. It means being intentional with every pixel, every color, and every interaction. It's about creating breathing room, allowing users to focus on what matters, and building interfaces that are both beautiful and functional.</p>
      
      <h2 style="margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 700;">The Future of Digital Creativity</h2>
      
      <p>As AI and machine learning continue to evolve, we're entering an era where creativity and technology are becoming increasingly intertwined. Generative AI isn't replacing designers and developers—it's augmenting their capabilities, allowing them to focus on higher-level creative decisions while automation handles repetitive tasks.</p>
      
      <p>The future belongs to those who can blend technical excellence with creative vision. The developers and designers who thrive will be those who understand both sides of the coin and can navigate the nuances of a rapidly changing technological landscape.</p>
    `,
  };

  const relatedArticles = [
    {
      id: 2,
      title: "The Art of Reduction: Why Less is More in UI Design",
      category: "MINIMALISM",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      author: "Erik V.",
      readTime: "12 min read",
      date: "June 12, 2026",
    },
    {
      id: 3,
      title: "Optimizing React 19 for High-Performance Dashboards",
      category: "WORKFLOW",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
      author: "Sarah J.",
      readTime: "8 min read",
      date: "June 10, 2026",
    },
    {
      id: 4,
      title: "Generative Art: The New Frontier of Web Assets",
      category: "CREATIVE",
      image:
        "https://images.unsplash.com/photo-1547887537-cb26c8a902f5?w=400&h=250&fit=crop",
      author: "Marc L.",
      readTime: "10 min read",
      date: "June 8, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cyan-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">TB</span>
            </div>
            <span className="font-bold text-gray-900">TECHBLOG</span>
          </div>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        {/* Category Badge */}
        <div className="inline-block mb-6">
          <span className="text-xs font-bold text-cyan-600 tracking-widest bg-cyan-100/60 px-4 py-2 rounded-full">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
          {blog.description}
        </p>

        {/* Author & Meta Info */}
        <div className="flex items-center justify-between flex-wrap gap-6 py-8 border-t border-cyan-100">
          <div className="flex items-center gap-4">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-200"
            />
            <div>
              <p className="font-semibold text-gray-900">{blog.author.name}</p>
              <p className="text-sm text-gray-600">{blog.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-cyan-500" />
              <span>{blog.publishedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyan-500" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Content & Sidebar */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Engagement Section */}
          <div className="mt-12 pt-8 border-t border-cyan-100">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <Heart size={20} fill="none" />
                <span className="text-sm font-semibold">{blog.likes}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <MessageCircle size={20} />
                <span className="text-sm font-semibold">{blog.comments}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <Share2 size={20} />
                <span className="text-sm font-semibold">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={20} />
              <span className="text-sm font-semibold tracking-widest">
                NEWSLETTER
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Join the Weekly Digest</h3>
            <p className="text-cyan-100 text-sm mb-6">
              Get the latest insights delivered directly to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/60 text-white text-sm border border-white/30 focus:outline-none focus:border-white/60 transition"
              />
              <button className="w-full px-4 py-3 rounded-lg bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Author Card */}
          <div className="bg-white rounded-2xl p-8 border border-cyan-100 mb-8">
            <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-widest">
              ABOUT AUTHOR
            </h4>
            <div className="flex flex-col items-center text-center">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-cyan-200 mb-4"
              />
              <h5 className="text-lg font-bold text-gray-900 mb-1">
                {blog.author.name}
              </h5>
              <p className="text-sm text-gray-600 mb-4">{blog.author.role}</p>
              <p className="text-sm text-gray-600 mb-6">
                Passionate about exploring the intersection of technology,
                design, and human creativity. Writing about the future of the
                web.
              </p>
              <button className="px-6 py-2 text-cyan-600 border-2 border-cyan-600 rounded-lg font-semibold text-sm hover:bg-cyan-50 transition">
                Follow
              </button>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-white rounded-2xl p-8 border border-cyan-100">
            <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-widest">
              SHARE THIS ARTICLE
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button className="w-full h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-semibold text-sm hover:shadow-lg transition">
                Twitter
              </button>
              <button className="w-full h-12 rounded-lg bg-gray-100 text-gray-900 font-semibold text-sm hover:bg-gray-200 transition">
                LinkedIn
              </button>
              <button className="w-full h-12 rounded-lg bg-gray-100 text-gray-900 font-semibold text-sm hover:bg-gray-200 transition">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-white border-t border-cyan-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Related Articles
          </h2>
          <p className="text-gray-600 mb-12">
            Explore more stories from our collection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-gray-50 border border-cyan-100 hover:border-cyan-300 transition"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold text-cyan-600 tracking-widest bg-white/90 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-cyan-600 transition">
                    {article.title}
                  </h3>

                  <div className="flex items-center gap-3 pb-4 border-b border-cyan-100">
                    <img
                      src={blog.author.avatar}
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-gray-900">
                        {article.author}
                      </p>
                      <p className="text-gray-600">{article.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
                    <Clock size={14} className="text-cyan-500" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Dive Deeper?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our weekly newsletter and get the latest insights on
            technology, design, and creativity delivered to your inbox.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:shadow-xl transition flex items-center justify-center gap-2 mx-auto">
            Start Reading <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

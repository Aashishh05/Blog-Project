import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscription feature coming soon!");
  };

  return (
    <footer className="bg-white border-t border-slate-200 px-6 md:px-12 py-14">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-slate-900">TechBlog</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Sharing modern web development insights, tutorials, and real-world
              coding experiences.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-5 text-slate-600">
              <a
                href="https://x.com/_Aashish_10"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition"
              >
                Twitter
              </a>

              <a
                href="https://www.linkedin.com/in/aashish-shrestha-32ab14366/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/Aashishh05"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/blogs" className="hover:text-slate-900">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-slate-900">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-slate-900">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/latest" className="hover:text-slate-900">
                  Latest Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/about" className="hover:text-slate-900">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-slate-900">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Subscribe</h4>

            <p className="text-sm text-slate-600 mb-4">
              Get the latest blog posts and updates delivered straight to your
              inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-slate-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} TechBlog. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-slate-900">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-slate-900">
              Terms
            </Link>

            <Link to="/sitemap" className="hover:text-slate-900">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

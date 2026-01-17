import { Link } from "react-router-dom";
import React from "react";
import {
  FaEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="relative w-full bg-zinc-900 text-white pt-16 pb-8"
      role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-blue-400">
              JGM Innovation
            </h5>
            <p className="text-gray-400 mb-4">
              Providing cutting-edge data science and AI solutions for
              education, government, and social impact projects.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@jgm.innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                aria-label="Follow us on Twitter">
                <FaYoutube className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com/jgminnovationperu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                aria-label="Follow us on Facebook">
                <FaFacebookSquare className="text-lg" />
              </a>
              <a
                href="https://www.instagram.com/jgm.innovation/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                aria-label="Follow us on Instagram">
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/company/jgm-innovation/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
                aria-label="Follow us on LinkedIn">
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
                  aria-label="Go to homepage">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
                  aria-label="Go to blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
                  aria-label="Go to login page">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
                  aria-label="Go to signup page">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">New York, NY, USA</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  guevaraw@jgminnovation.org
                </span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 516-884-2037</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-zinc-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter your email for newsletter subscription"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Subscribe to newsletter">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-sm text-gray-400 font-semibold">
              Copyright © {new Date().getFullYear()} JGM Innovation. All rights
              reserved.
            </div>
          </div>
          <div className="flex space-x-6">
            {/*<Link
              to="/privacy"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
              aria-label="View privacy policy">
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
              aria-label="View terms of service">
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded focus:ring-offset-2 focus:ring-offset-zinc-900"
              aria-label="View cookie policy">
              Cookie Policy
            </Link>*/}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);

import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="text-center lg:text-left">
          <span className="text-cyan-400 font-semibold uppercase tracking-widest">
            Error 404
          </span>

          <h1 className="text-6xl lg:text-7xl font-extrabold text-white mt-4">
            Oops!
          </h1>

          <h2 className="text-3xl font-bold text-slate-200 mt-3">
            Page Not Found
          </h2>

          <p className="text-slate-400 mt-6 leading-8">
            The page you're looking for doesn't exist or may have been moved.
            Don't worry, you can always return to the homepage and continue
            exploring exciting job opportunities.
          </p>

          <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
            <Link
              to="/"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <FaHome />
              Go Home
            </Link>

            <Link
              to="/job/getall"
              className="flex items-center gap-2 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 text-white px-6 py-3 rounded-xl transition"
            >
              <FaSearch />
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="/notfound.png"
            alt="404 Not Found"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;

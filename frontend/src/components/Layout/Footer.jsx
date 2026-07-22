import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer
      className={`${
        isAuthorized ? "block" : "hidden"
      } bg-slate-900 border-t border-slate-700`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">CareerConnect</h2>

            <p className="text-slate-400 mt-2 text-sm">
              Connecting talent with opportunities.
            </p>

            <p className="text-slate-500 text-sm mt-3 flex items-center justify-center md:justify-start gap-2">
              © {new Date().getFullYear()} Made with
              <FaHeart className="text-red-500" />
              by{" "}
              <span className="text-cyan-400 font-semibold">
                Adarsh Kumar Prajapati
              </span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <Link
              to="https://github.com/Adarsh-tech1"
              target="_blank"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-cyan-500 hover:scale-110 transition duration-300"
            >
              <FaGithub size={22} />
            </Link>

            <Link
              to="https://leetcode.com/u/adarshprajapati1207755/"
              target="_blank"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-yellow-500 hover:scale-110 transition duration-300"
            >
              <SiLeetcode size={22} />
            </Link>

            <Link
              to="https://linkedin.com/in/adarsh-tech1"
              target="_blank"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition duration-300"
            >
              <FaLinkedin size={22} />
            </Link>

            <Link
              to="https://www.instagram.com/adarsh_kumar_prajapati/"
              target="_blank"
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-pink-500 hover:scale-110 transition duration-300"
            >
              <RiInstagramFill size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

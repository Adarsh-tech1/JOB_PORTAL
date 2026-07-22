import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { api, getErrorMessage } from "../../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post(
        "/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success(data.message);
      setUser(data.user);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to log in."));
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Left Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <img
              src="/careerconnect-black.png"
              alt="logo"
              className="h-14 mx-auto lg:mx-0 mb-5"
            />

            <h1 className="text-4xl font-bold text-white">Welcome Back </h1>

            <p className="text-slate-400 mt-3">
              Login to continue your journey with CareerConnect.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role */}

            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Login As
              </label>

              <div className="relative">
                <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                </select>
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">
                <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 pr-14 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl text-white font-semibold text-lg transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Register Now
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side */}

        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-slate-900 p-10">
          <img src="/login.png" alt="login" className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
};

export default Login;

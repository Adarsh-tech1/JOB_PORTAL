import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { api, getErrorMessage } from "../../utils/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post(
        "/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success(data.message);
      setUser(data.user);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to register."));
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
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-slate-900 p-10">
          <img src="/register.png" alt="register" className="w-full max-w-md" />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <img
              src="/careerconnect-black.png"
              alt="logo"
              className="h-14 mx-auto lg:mx-0 mb-5"
            />

            <h1 className="text-4xl font-bold text-white">
              Create Your Account Now
            </h1>

            <p className="text-slate-400 mt-3">
              Join CareerConnect and start your professional journey today.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Role */}
            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Register As
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
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaPencilAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
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

            {/* Phone */}
            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Phone Number
              </label>

              <div className="relative">
                <FaPhoneFlip className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  placeholder="Create a password"
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

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl text-white text-lg font-semibold transition disabled:opacity-70"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>

            {/* Login Link */}
            <p className="text-center text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

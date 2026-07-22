import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { api, getErrorMessage } from "../../utils/api";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/job/getall", label: "All Jobs" },
    {
      to: "/applications/me",
      label: user?.role === "Employer" ? "Applicants" : "My Applications",
    },
    ...(user?.role === "Employer"
      ? [
          { to: "/job/post", label: "Post Job" },
          { to: "/job/me", label: "My Jobs" },
        ]
      : []),
  ];

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await api.get("/user/logout");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(getErrorMessage(error, "Logged out."));
    } finally {
      setShowMenu(false);
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    }
  };

  const getLinkClasses = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
      isActive
        ? "bg-[#D83F87] text-white shadow-[0_10px_25px_rgba(216,63,135,0.35)]"
        : "text-[#f3eef8] hover:bg-[#E98074]/20 hover:text-white",
    ].join(" ");

  if (!isAuthorized) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#2A1B3D]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/careerconnect-white.png"
            alt="CareerConnect"
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-[#A4B3B6]/40"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight text-white sm:text-lg">
              CareerConnect
            </p>
            <p className="truncate text-xs uppercase tracking-[0.2em] text-[#A4B3B6]">
              Job Portal
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={getLinkClasses}>
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="ml-3 rounded-full bg-[#E98074] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#D83F87]"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl text-white transition-colors duration-200 hover:bg-[#44318D] lg:hidden"
          aria-label={showMenu ? "Close menu" : "Open menu"}
        >
          {showMenu ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 transition-all duration-300 lg:hidden ${
          showMenu ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200",
                  isActive
                    ? "bg-[#D83F87] text-white"
                    : "bg-white/5 text-[#f3eef8] hover:bg-[#44318D] hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="block w-full rounded-2xl bg-[#E98074] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#D83F87]"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

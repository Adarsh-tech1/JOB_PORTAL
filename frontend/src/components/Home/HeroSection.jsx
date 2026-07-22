import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  const detailCardThemes = [
    {
      card: "linear-gradient(180deg, rgba(37,78,88,0.92) 0%, rgba(17,45,50,0.96) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.26)",
      shadow: "rgba(17, 45, 50, 0.35)",
    },
    {
      card: "linear-gradient(180deg, rgba(79,74,65,0.94) 0%, rgba(37,78,88,0.92) 100%)",
      icon: "#A4B3B6",
      iconText: "#112D32",
      border: "rgba(164, 179, 182, 0.24)",
      shadow: "rgba(17, 45, 50, 0.35)",
    },
    {
      card: "linear-gradient(180deg, rgba(17,45,50,0.96) 0%, rgba(37,78,88,0.92) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.24)",
      shadow: "rgba(17, 45, 50, 0.36)",
    },
    {
      card: "linear-gradient(180deg, rgba(110,102,88,0.92) 0%, rgba(79,74,65,0.96) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.22)",
      shadow: "rgba(17, 45, 50, 0.34)",
    },
  ];

  return (
    <section className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a67b2]/45 px-8 py-12 shadow-[0_30px_80px_rgba(5,25,70,0.22)] backdrop-blur-sm md:px-12 lg:px-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5" />
            <div className="absolute -left-20 bottom-[-8rem] h-72 w-72 rounded-full border-[30px] border-[#9effdf]/20" />
            <div className="absolute right-[-4rem] bottom-[-5rem] h-80 w-80 rounded-full border-[32px] border-[#8bf9d7]/35" />
            <div className="absolute right-10 top-10 h-44 w-44 rounded-full bg-[#86ffd8]/25 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#97ffdf] shadow-[0_0_25px_rgba(151,255,223,0.15)]">
                India&apos;s Smart Job Portal
              </span>

              <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">
                Find Your
                <span className="text-[#8df9d7]"> Dream Job </span>
                With Confidence.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/78">
                Discover thousands of verified job opportunities from top
                companies. Connect with recruiters, apply instantly, and build
                your career with CareerConnect.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <button className="rounded-xl bg-[#2ce7bc] px-8 py-4 font-semibold text-[#083d72] transition hover:bg-[#64f4cf]">
                  Explore Jobs
                </button>

                <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-[#8df9d7] hover:text-[#9bffdf]">
                  Post a Job
                </button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute left-6 top-12 h-56 w-56 rounded-full bg-[#a8ffe6]/20 blur-3xl" />
              <div className="absolute right-8 top-0 h-72 w-72 rounded-full border-[28px] border-[#8bf9d7]/35" />
              <img
                src="/hero-monkey.png"
                alt="Stylish monkey mascot"
                className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/20 object-contain shadow-[0_35px_80px_rgba(6,25,69,0.35)]"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item, index) => {
            const theme = detailCardThemes[index % detailCardThemes.length];

            return (
            <div
              key={item.id}
              className="rounded-2xl p-6 transition duration-300 hover:-translate-y-2"
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                boxShadow: `0 20px 45px ${theme.shadow}`,
              }}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                style={{
                  backgroundColor: theme.icon,
                  color: theme.iconText,
                }}
              >
                {item.icon}
              </div>

              <h2 className="text-3xl font-bold">{item.title}</h2>

              <p className="mt-2 text-[#d6e1de]">{item.subTitle}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

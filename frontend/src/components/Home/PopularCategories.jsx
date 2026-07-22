import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN Stack",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  const categoryCardThemes = [
    {
      card: "linear-gradient(180deg, rgba(17,45,50,0.97) 0%, rgba(37,78,88,0.93) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.25)",
      shadow: "rgba(17, 45, 50, 0.32)",
    },
    {
      card: "linear-gradient(180deg, rgba(79,74,65,0.94) 0%, rgba(37,78,88,0.94) 100%)",
      icon: "#A4B3B6",
      iconText: "#112D32",
      border: "rgba(164, 179, 182, 0.24)",
      shadow: "rgba(17, 45, 50, 0.3)",
    },
    {
      card: "linear-gradient(180deg, rgba(37,78,88,0.94) 0%, rgba(79,74,65,0.94) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.24)",
      shadow: "rgba(17, 45, 50, 0.3)",
    },
    {
      card: "linear-gradient(180deg, rgba(110,102,88,0.92) 0%, rgba(17,45,50,0.96) 100%)",
      icon: "#A4B3B6",
      iconText: "#112D32",
      border: "rgba(164, 179, 182, 0.22)",
      shadow: "rgba(17, 45, 50, 0.32)",
    },
  ];

  return (
    <section className="bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-semibold uppercase tracking-widest text-[#88BDBC]">
            Categories
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Popular Job Categories
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/78">
            Explore thousands of opportunities across different industries and
            find the career path that matches your skills.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const theme = categoryCardThemes[index % categoryCardThemes.length];

            return (
            <div
              key={category.id}
              className="group cursor-pointer rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                boxShadow: `0 18px 45px ${theme.shadow}`,
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition group-hover:scale-110"
                style={{
                  backgroundColor: theme.icon,
                  color: theme.iconText,
                }}
              >
                {category.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-[#d7dfdc]">{category.subTitle}</p>

              <button className="mt-6 font-medium text-[#88BDBC] transition hover:text-white">
                View Jobs
              </button>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;

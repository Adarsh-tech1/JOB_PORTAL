import { FaMicrosoft, FaApple, FaMapMarkerAlt } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { HiOutlineBriefcase } from "react-icons/hi";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  const companyCardThemes = [
    {
      card: "linear-gradient(180deg, rgba(37,78,88,0.95) 0%, rgba(17,45,50,0.98) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.25)",
    },
    {
      card: "linear-gradient(180deg, rgba(79,74,65,0.94) 0%, rgba(37,78,88,0.94) 100%)",
      icon: "#A4B3B6",
      iconText: "#112D32",
      border: "rgba(164, 179, 182, 0.24)",
    },
    {
      card: "linear-gradient(180deg, rgba(17,45,50,0.98) 0%, rgba(79,74,65,0.92) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.24)",
    },
  ];

  return (
    <section className="bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-semibold uppercase tracking-widest text-[#88BDBC]">
            Companies
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Top Hiring Companies
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/78">
            Discover leading companies actively hiring talented professionals.
            Apply today and take the next step in your career.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, index) => {
            const theme = companyCardThemes[index % companyCardThemes.length];

            return (
            <div
              key={company.id}
              className="group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                boxShadow: "0 18px 45px rgba(17, 45, 50, 0.3)",
              }}
            >
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition group-hover:scale-110"
                style={{
                  backgroundColor: theme.icon,
                  color: theme.iconText,
                }}
              >
                {company.icon}
              </div>

              <h3 className="text-2xl font-bold text-white">{company.title}</h3>

              <div className="mt-3 flex items-center gap-2 text-[#d7dfdc]">
                <FaMapMarkerAlt className="text-[#88BDBC]" />
                <span>{company.location}</span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-white">
                <HiOutlineBriefcase className="text-xl text-[#88BDBC]" />
                <span className="font-semibold">
                  {company.openPositions} Open Positions
                </span>
              </div>

              <button className="mt-8 w-full rounded-xl bg-[#88BDBC] py-3 font-semibold text-[#112D32] transition duration-300 hover:bg-[#A4B3B6]">
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

export default PopularCompanies;

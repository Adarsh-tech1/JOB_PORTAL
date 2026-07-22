import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create an Account",
      description:
        "Sign up as a Job Seeker or Employer to unlock all features and start your career journey.",
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Find or Post Jobs",
      description:
        "Browse thousands of verified jobs or post openings to find the perfect candidate for your company.",
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Apply & Get Hired",
      description:
        "Submit applications with one click and connect directly with recruiters for exciting opportunities.",
    },
  ];

  const stepCardThemes = [
    {
      card: "linear-gradient(180deg, rgba(37,78,88,0.94) 0%, rgba(17,45,50,0.98) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.25)",
      number: "rgba(136, 189, 188, 0.14)",
    },
    {
      card: "linear-gradient(180deg, rgba(79,74,65,0.92) 0%, rgba(37,78,88,0.95) 100%)",
      icon: "#A4B3B6",
      iconText: "#112D32",
      border: "rgba(164, 179, 182, 0.24)",
      number: "rgba(164, 179, 182, 0.14)",
    },
    {
      card: "linear-gradient(180deg, rgba(17,45,50,0.98) 0%, rgba(79,74,65,0.92) 100%)",
      icon: "#88BDBC",
      iconText: "#112D32",
      border: "rgba(136, 189, 188, 0.24)",
      number: "rgba(136, 189, 188, 0.12)",
    },
  ];

  return (
    <section className="bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-semibold uppercase tracking-wider text-[#88BDBC]">
            Process
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            How CareerConnect Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/78">
            A simple and efficient hiring platform that connects talented
            professionals with trusted companies in just a few easy steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const theme = stepCardThemes[index % stepCardThemes.length];

            return (
            <div
              key={step.id}
              className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
                boxShadow: "0 18px 45px rgba(17, 45, 50, 0.28)",
              }}
            >
              <span
                className="absolute right-5 top-5 text-5xl font-bold"
                style={{ color: theme.number }}
              >
                0{step.id}
              </span>

              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{
                  backgroundColor: theme.icon,
                  color: theme.iconText,
                }}
              >
                {step.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {step.title}
              </h3>

              <p className="leading-7 text-[#d7dfdc]">{step.description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

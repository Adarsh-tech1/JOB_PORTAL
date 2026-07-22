import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b6fbe] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f6fb8 0%, #0b7acb 45%, #08599f 100%)",
          }}
        />
        <div className="absolute -top-24 left-[-7rem] h-72 w-72 rounded-full bg-[#9bffdf]/20 blur-3xl" />
        <div className="absolute top-20 right-[-5rem] h-80 w-80 rounded-full bg-[#35e8bf]/20 blur-3xl" />
        <div className="absolute bottom-16 left-1/4 h-64 w-64 rounded-full bg-[#c9ffef]/12 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      <div className="relative z-10">
        <HeroSection />

        <section className="mx-auto max-w-7xl px-6 py-20 space-y-24">
          <HowItWorks />
          <PopularCategories />
          <PopularCompanies />
        </section>
      </div>
    </main>
  );
};

export default Home;

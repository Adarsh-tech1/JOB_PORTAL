import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { api } from "../../utils/api";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get("/job/getall");
        setJobs(data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2A1B3D] px-4 py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,63,135,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(68,49,141,0.5),_transparent_35%),linear-gradient(180deg,_#2A1B3D_0%,_#221733_100%)]" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#E98074]/15 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-[-6rem] h-80 w-80 rounded-full bg-[#44318D]/45 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="font-semibold uppercase tracking-widest text-[#E98074]">
            Careers
          </span>

          <h1 className="mt-3 text-5xl font-bold text-white">
            Explore Available Jobs
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#d6cee4]">
            Browse the latest opportunities from top companies and find the
            perfect role that matches your skills and career goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="rounded-2xl border border-white/10 bg-[#34224b]/90 p-6 shadow-[0_20px_45px_rgba(15,8,30,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D83F87] hover:shadow-[0_20px_45px_rgba(216,63,135,0.18)]"
            >
              <span className="inline-block rounded-full bg-[#D83F87]/18 px-3 py-1 text-sm font-medium text-[#f7a1be]">
                {job.category}
              </span>

              <h2 className="mt-5 text-2xl font-bold text-white">{job.title}</h2>

              <div className="mt-5 flex items-center gap-2 text-[#c8bdd9]">
                <FaGlobe className="text-[#E98074]" />
                <span>{job.country}</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[#c8bdd9]">
                <FaMapMarkerAlt className="text-[#E98074]" />
                <span>
                  {job.city}, {job.location}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[#f3eef8]">
                <FaMoneyBillWave className="text-[#D83F87]" />
                <span>
                  {job.fixedSalary
                    ? `INR ${job.fixedSalary}`
                    : `INR ${job.salaryFrom} - INR ${job.salaryTo}`}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[#f3eef8]">
                <FaBriefcase className="text-[#A4B3B6]" />
                <span>{job.category}</span>
              </div>

              <p className="mt-5 line-clamp-3 text-[#d6cee4]">
                {job.description}
              </p>

              <Link
                to={`/job/${job._id}`}
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#D83F87] py-3 font-semibold text-white transition hover:bg-[#E98074]"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;

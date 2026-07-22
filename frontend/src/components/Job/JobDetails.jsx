import { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { api } from "../../utils/api";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    api
      .get(`/job/${id}`)
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-10">
            <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold">
              {job.category}
            </span>

            <h1 className="text-4xl font-bold text-white mt-5">{job.title}</h1>

            <div className="flex flex-wrap gap-6 mt-6 text-slate-400">
              <div className="flex items-center gap-2">
                <FaBuilding className="text-cyan-400" />
                {job.location}
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-cyan-400" />
                {job.city}
              </div>

              <div className="flex items-center gap-2">
                <FaGlobe className="text-cyan-400" />
                {job.country}
              </div>
            </div>
          </div>

          {/* Details */}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-cyan-400 font-semibold flex items-center gap-2">
                <FaBriefcase />
                Job Category
              </p>

              <p className="text-white mt-2">{job.category}</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-cyan-400 font-semibold flex items-center gap-2">
                <FaMoneyBillWave />
                Salary
              </p>

              <p className="text-white mt-2">
                {job.fixedSalary
                  ? `₹${job.fixedSalary}`
                  : `₹${job.salaryFrom} - ₹${job.salaryTo}`}
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 md:col-span-2">
              <p className="text-cyan-400 font-semibold mb-3">
                Job Description
              </p>

              <p className="text-slate-300 leading-8">{job.description}</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 md:col-span-2">
              <p className="text-cyan-400 font-semibold flex items-center gap-2">
                <FaCalendarAlt />
                Posted On
              </p>

              <p className="text-white mt-2">{job.jobPostedOn}</p>
            </div>
          </div>

          {/* Button */}

          {user?.role !== "Employer" && (
            <div className="mt-10">
              <Link
                to={`/application/${job._id}`}
                className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-white font-semibold transition duration-300"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;

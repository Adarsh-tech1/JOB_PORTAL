import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Context } from "../../main";
import { api, getErrorMessage } from "../../utils/api";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const { data } = await api.post(
        "/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to create the job."));
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2A1B3D] px-4 py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,63,135,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(68,49,141,0.48),_transparent_35%),linear-gradient(180deg,_#2A1B3D_0%,_#221733_100%)]" />
        <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-[#44318D]/40 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#E98074]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#34224b]/90 p-8 shadow-[0_30px_70px_rgba(15,8,30,0.35)]">
        <div className="mb-10 text-center">
          <span className="font-semibold uppercase tracking-widest text-[#E98074]">
            Employer Dashboard
          </span>

          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Post New Job
          </h1>

          <p className="mt-4 text-[#d6cee4]">
            Fill in the details below to publish a new job opportunity.
          </p>
        </div>

        <form onSubmit={handleJobPost} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#E98074]">
                Job Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Job Title"
                className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#E98074]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white outline-none focus:ring-2 focus:ring-[#D83F87]"
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="Business Development Executive">
                  Business Development Executive
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN Stack Development
                </option>
                <option value="MERN Stack Development">
                  MERN Stack Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#E98074]">
                Country
              </label>

              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#E98074]">
                City
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#E98074]">
              Job Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Office Address / Remote"
              className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
            />
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block font-semibold text-[#E98074]">
                Salary Type
              </label>

              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white outline-none focus:ring-2 focus:ring-[#D83F87]"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
            </div>

            {salaryType === "default" ? (
              <div className="rounded-xl border border-[#E98074] bg-[#E98074]/10 p-4 text-[#ffd0c9]">
                Please select a salary type.
              </div>
            ) : salaryType === "Fixed Salary" ? (
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                className="w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  className="rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
                />

                <input
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  className="rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-3 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#E98074]">
              Job Description
            </label>

            <textarea
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job responsibilities, required skills, qualifications, and benefits..."
              className="w-full resize-none rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-5 py-4 text-white placeholder-[#9fa8bc] outline-none focus:ring-2 focus:ring-[#D83F87]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#D83F87] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#E98074]"
          >
            Create Job
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import { api, getErrorMessage } from "../../utils/api";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get("/job/getmyjobs");
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(getErrorMessage(error, "Unable to load your jobs."));
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    return <Navigate to="/login" />;
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const { data } = await api.put(`/job/update/${jobId}`, updatedJob);
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to update the job."));
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await api.delete(`/job/delete/${jobId}`);
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to delete the job."));
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job,
      ),
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2A1B3D] px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,63,135,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(68,49,141,0.5),_transparent_35%),linear-gradient(180deg,_#2A1B3D_0%,_#221733_100%)]" />
        <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-[#44318D]/42 blur-3xl" />
        <div className="absolute bottom-0 right-4 h-72 w-72 rounded-full bg-[#E98074]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Your Posted Jobs
          </h1>
          <p className="mt-3 text-[#d6cee4]">
            Manage, edit and delete your job postings.
          </p>
        </div>

        {myJobs.length > 0 ? (
          <div className="space-y-8">
            {myJobs.map((element) => (
              <div
                key={element._id}
                className="rounded-3xl border border-white/10 bg-[#34224b]/90 p-8 shadow-[0_20px_50px_rgba(15,8,30,0.35)] transition-all duration-300 hover:border-[#D83F87]"
              >
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="font-semibold text-[#E98074]">Title</label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.title}
                      onChange={(e) =>
                        handleInputChange(element._id, "title", e.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white disabled:opacity-70"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#E98074]">
                      Country
                    </label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.country}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "country",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white disabled:opacity-70"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#E98074]">City</label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.city}
                      onChange={(e) =>
                        handleInputChange(element._id, "city", e.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white disabled:opacity-70"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#E98074]">
                      Category
                    </label>

                    <select
                      value={element.category}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "category",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                    >
                      <option>Graphics & Design</option>
                      <option>Mobile App Development</option>
                      <option>Frontend Web Development</option>
                      <option>MERN Stack Development</option>
                      <option>Account & Finance</option>
                      <option>Artificial Intelligence</option>
                      <option>Video Animation</option>
                      <option>MEAN Stack Development</option>
                      <option>MEVN Stack Development</option>
                      <option>Data Entry Operator</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#E98074]">
                      Salary
                    </label>

                    {element.fixedSalary ? (
                      <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.fixedSalary}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "fixedSalary",
                            e.target.value,
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                      />
                    ) : (
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.salaryFrom}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "salaryFrom",
                              e.target.value,
                            )
                          }
                          className="rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                        />

                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.salaryTo}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "salaryTo",
                              e.target.value,
                            )
                          }
                          className="rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="font-semibold text-[#E98074]">
                      Expired
                    </label>

                    <select
                      value={element.expired}
                      disabled={editingMode !== element._id}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "expired",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div>
                    <label className="font-semibold text-[#E98074]">
                      Description
                    </label>

                    <textarea
                      rows={6}
                      disabled={editingMode !== element._id}
                      value={element.description}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "description",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full resize-none rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#E98074]">
                      Location
                    </label>

                    <textarea
                      rows={6}
                      disabled={editingMode !== element._id}
                      value={element.location}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "location",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full resize-none rounded-xl border border-[#6b59a0] bg-[#2A1B3D] px-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-end gap-4">
                  {editingMode === element._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateJob(element._id)}
                        className="rounded-xl bg-[#D83F87] p-3 text-white transition hover:bg-[#E98074]"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={handleDisableEdit}
                        className="rounded-xl bg-[#A4B3B6] p-3 text-[#2A1B3D] transition hover:bg-white"
                      >
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(element._id)}
                      className="rounded-xl bg-[#D83F87] px-6 py-3 font-semibold text-white transition hover:bg-[#E98074]"
                    >
                      Edit Job
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="rounded-xl bg-[#44318D] px-6 py-3 font-semibold text-white transition hover:bg-[#2A1B3D]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#34224b]/90 p-16 text-center">
            <h2 className="text-3xl font-bold text-white">No Jobs Found</h2>

            <p className="mt-4 text-[#d6cee4]">
              You haven&apos;t posted any jobs yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyJobs;

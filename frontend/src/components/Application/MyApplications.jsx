import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { api, getErrorMessage } from "../../utils/api";

const isPdfResume = (resumeUrl = "") => /\.pdf(?:$|[?#])/i.test(resumeUrl);

const applicationPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  address: PropTypes.string,
  coverLetter: PropTypes.string,
  resume: PropTypes.shape({
    url: PropTypes.string,
  }),
});

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user && user.role === "Employer"
            ? "/application/employer/getall"
            : "/application/jobseeker/getall";
        const { data } = await api.get(endpoint);
        setApplications(data.applications);
      } catch (error) {
        toast.error(
          getErrorMessage(error, "Unable to load applications right now."),
        );
        setApplications([]);
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const deleteApplication = (id) => {
    api
      .delete(`/application/delete/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prevApplication) =>
          prevApplication.filter((application) => application._id !== id),
        );
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, "Unable to delete application."));
      });
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2A1B3D] px-4 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,63,135,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(68,49,141,0.5),_transparent_35%),linear-gradient(180deg,_#2A1B3D_0%,_#221733_100%)]" />
        <div className="absolute left-10 top-20 h-96 w-96 rounded-full bg-[#44318D]/35 blur-[150px]"></div>
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#E98074]/15 blur-[160px]"></div>
      </div>

      {user && user.role === "Job Seeker" ? (
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="font-semibold uppercase tracking-[6px] text-[#E98074]">
              Dashboard
            </span>

            <h1 className="mt-4 text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(216,63,135,0.35)]">
              My Applications
            </h1>

            <p className="mt-4 text-[#d6cee4]">
              Track every application you&apos;ve submitted.
            </p>
          </div>

          {applications.length <= 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#34224b]/85 p-16 text-center shadow-[0_0_40px_rgba(68,49,141,.28)] backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-white">
                No Applications Found
              </h2>

              <p className="mt-3 text-[#d6cee4]">
                Start applying for jobs to see them here.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {applications.map((element) => (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="font-semibold uppercase tracking-[6px] text-[#E98074]">
              Employer Dashboard
            </span>

            <h1 className="mt-4 text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(216,63,135,0.35)]">
              Applications From Job Seekers
            </h1>

            <p className="mt-4 text-[#d6cee4]">
              Review applications received for your job postings.
            </p>
          </div>

          {applications.length <= 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#34224b]/85 p-16 text-center shadow-[0_0_40px_rgba(68,49,141,.28)] backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-white">
                No Applications Found
              </h2>

              <p className="mt-3 text-[#d6cee4]">
                Applications will appear here once candidates apply.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {applications.map((element) => (
                <EmployerCard
                  key={element._id}
                  element={element}
                  openModal={openModal}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const ResumePreview = ({ resumeUrl, openModal }) => {
  if (!resumeUrl) {
    return (
      <div className="flex h-full min-h-56 items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#2A1B3D] p-6 text-center text-sm text-[#d6cee4]">
        Resume preview unavailable.
      </div>
    );
  }

  if (isPdfResume(resumeUrl)) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#2A1B3D] p-6 text-center">
        <p className="text-lg font-semibold text-white">PDF Resume</p>
        <p className="mt-2 text-sm text-[#d6cee4]">
          Preview the PDF in a modal or open it in a new tab.
        </p>
        <button
          type="button"
          onClick={() => openModal(resumeUrl)}
          className="mt-5 w-full rounded-xl bg-[#D83F87] py-3 font-semibold text-white transition hover:bg-[#E98074]"
        >
          Preview Resume
        </button>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-sm font-medium text-[#f7a1be] transition hover:text-[#ffd0c9]"
        >
          Open PDF
        </a>
      </div>
    );
  }

  return (
    <img
      src={resumeUrl}
      alt="resume"
      onClick={() => openModal(resumeUrl)}
      className="cursor-pointer rounded-xl border border-white/10 transition hover:scale-105"
    />
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const resumeUrl = element.resume?.url || "";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#34224b]/90 p-6 shadow-[0_20px_45px_rgba(15,8,30,0.35)] transition-all duration-300 hover:border-[#D83F87]">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D83F87] text-2xl font-bold text-white">
              {element.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{element.name}</h2>

              <p className="text-[#A4B3B6]">Job Applicant</p>
            </div>
          </div>

          <div className="grid gap-4 text-[#f3eef8] md:grid-cols-2">
            <p>
              <span className="font-semibold text-[#E98074]">Email:</span>{" "}
              {element.email}
            </p>

            <p>
              <span className="font-semibold text-[#E98074]">Phone:</span>{" "}
              {element.phone}
            </p>

            <p className="md:col-span-2">
              <span className="font-semibold text-[#E98074]">Address:</span>{" "}
              {element.address}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 font-semibold text-[#E98074]">Cover Letter</h3>

            <p className="leading-7 text-[#f3eef8]">{element.coverLetter}</p>
          </div>
        </div>

        <div className="lg:w-60">
          <ResumePreview resumeUrl={resumeUrl} openModal={openModal} />

          <button
            type="button"
            onClick={() => deleteApplication(element._id)}
            className="mt-5 w-full rounded-xl bg-[#44318D] py-3 font-semibold text-white transition hover:bg-[#D83F87]"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const resumeUrl = element.resume?.url || "";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#34224b]/90 p-6 shadow-[0_20px_45px_rgba(15,8,30,0.35)] transition-all duration-300 hover:border-[#D83F87]">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#44318D] text-2xl font-bold text-white">
              {element.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{element.name}</h2>

              <p className="text-[#A4B3B6]">Applicant</p>
            </div>
          </div>

          <div className="grid gap-4 text-[#f3eef8] md:grid-cols-2">
            <p>
              <span className="font-semibold text-[#E98074]">Email:</span>{" "}
              {element.email}
            </p>

            <p>
              <span className="font-semibold text-[#E98074]">Phone:</span>{" "}
              {element.phone}
            </p>

            <p className="md:col-span-2">
              <span className="font-semibold text-[#E98074]">Address:</span>{" "}
              {element.address}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 font-semibold text-[#E98074]">Cover Letter</h3>

            <p className="leading-7 text-[#f3eef8]">{element.coverLetter}</p>
          </div>
        </div>

        <div className="lg:w-60">
          <ResumePreview resumeUrl={resumeUrl} openModal={openModal} />
        </div>
      </div>
    </div>
  );
};

ResumePreview.propTypes = {
  resumeUrl: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

JobSeekerCard.propTypes = {
  element: applicationPropType.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

EmployerCard.propTypes = {
  element: applicationPropType.isRequired,
  openModal: PropTypes.func.isRequired,
};

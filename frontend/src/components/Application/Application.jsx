import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { api, getErrorMessage } from "../../utils/api";

const allowedResumeTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
];

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      toast.error("Invalid job selected.");
      navigateTo("/job/getall");
    }
  }, [id, navigateTo]);

  useEffect(() => {
    if (user && user.role === "Job Seeker") {
      setName((prev) => prev || user.name || "");
      setEmail((prev) => prev || user.email || "");
      setPhone((prev) => prev || String(user.phone || ""));
    }
  }, [user]);

  // Function to handle file input changes with validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");

    if (!file) {
      setResume(null);
      return;
    }

    // Check file type
    if (!allowedResumeTypes.includes(file.type)) {
      setFileError(
        "Please select a valid resume file (PNG, JPEG, WEBP, or PDF)",
      );
      setResume(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB");
      setResume(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setResume(file);
  };

  const handlePhoneChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 15);
    setPhone(numericValue);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();
    const trimmedCoverLetter = coverLetter.trim();

    // Validate form
    if (
      !trimmedName ||
      !trimmedEmail ||
      !phone ||
      !trimmedAddress ||
      !trimmedCoverLetter
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!resume) {
      setFileError("Please upload your resume");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", trimmedName);
    formData.append("email", trimmedEmail);
    formData.append("phone", phone);
    formData.append("address", trimmedAddress);
    formData.append("coverLetter", trimmedCoverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await api.post("/application/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      setFileError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Something went wrong. Please try again later.",
      );
      toast.error(errorMessage);

      // Show specific message for Cloudinary errors
      if (
        errorMessage.includes("Cloudinary") ||
        errorMessage.includes("api_key")
      ) {
        toast.error(
          "File upload service is currently unavailable. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Apply for this Job
            </h1>

            <p className="text-slate-400 mt-2">
              Complete the application form to submit your profile.
            </p>
          </div>

          <form onSubmit={handleApplication} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Phone Number
                </label>

                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={loading}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Address
                </label>

                <input
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-sm mb-2 block">
                Cover Letter
              </label>

              <textarea
                rows="6"
                placeholder="Write your cover letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white resize-none outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 text-sm mb-2 block">
                Upload Resume
              </label>

              <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center bg-slate-800">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="block w-full text-slate-300
                file:bg-cyan-600
                file:text-white
                file:border-0
                file:px-4
                file:py-2
                file:rounded-lg
                file:cursor-pointer"
                />

                <p className="text-slate-500 text-sm mt-3">
                  Supported: PNG, JPG, JPEG, WEBP, PDF (Max 2MB)
                </p>

                {resume && (
                  <p className="mt-3 text-sm font-medium text-cyan-300">
                    Selected file: {resume.name}
                  </p>
                )}

                {fileError && <p className="text-red-500 mt-3">{fileError}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 transition rounded-xl py-4 text-lg font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;

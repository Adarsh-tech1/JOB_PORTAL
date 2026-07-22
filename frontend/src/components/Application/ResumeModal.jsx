import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const isPdfResume = (resumeUrl = "") => /\.pdf(?:$|[?#])/i.test(resumeUrl);

const ResumeModal = ({ imageUrl, onClose }) => {
  const isPdf = isPdfResume(imageUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Resume Preview</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500 transition flex items-center justify-center text-white"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Resume Image */}
        <div className="p-6 flex justify-center max-h-[80vh] overflow-auto">
          {!imageUrl ? (
            <p className="text-slate-300">Resume preview unavailable.</p>
          ) : isPdf ? (
            <iframe
              src={imageUrl}
              title="Resume Preview"
              className="h-[75vh] w-full rounded-xl border border-slate-700 bg-white"
            />
          ) : (
            <img
              src={imageUrl}
              alt="Resume"
              className="rounded-xl shadow-lg border border-slate-700 max-w-full h-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
};

ResumeModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResumeModal;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/api";
import Alert from "../../modal/alert/alert";
import { AxiosError } from "axios";

interface ReportForm {
  title: string;
  description: string;
  date: string;
  attachment: File | null;
}

const CreateReport: React.FC = () => {
  const [feedback, setFeedback] = useState<ReportForm>({
    title: "",
    description: "",
    date: "",
    attachment: null,
  });
  const navigate = useNavigate();
  const { complaintId } = useParams<{ complaintId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorBody, setErrorBody] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFeedback({ ...feedback, attachment: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!complaintId) {
      alert("Complaint ID tidak ditemukan.");
      return;
    }

    const formData = new FormData();
    formData.append("title", feedback.title);
    formData.append("description", feedback.description);
    formData.append("date", feedback.date);
    if (feedback.attachment) formData.append("attachment", feedback.attachment);
    formData.append("complaint", complaintId); // Tambahkan ID pengaduan

    try {
      const response = await api.post(
        `/admin-feedback/${complaintId}`,
        formData
      );

      if (response.status === 201) {
        console.log("Response Data:", response.data);
        setIsModalOpen(true);
      } else {
        console.error("Response Error:", response.data);
        alert("Gagal mengirim feedback.");
      }
    } catch (error: unknown) {
      console.error(
        "Error Response:",
        (error instanceof AxiosError && error.response?.data) ||
          (error instanceof AxiosError && error.message)
      );
      alert(
        `Terjadi kesalahan saat mengirim feedback: ${
          (error instanceof AxiosError && error.response?.data?.message) ||
          "Internal Server Error"
        }`
      );
    }
  };
  const closeModal = () => {
    setErrorBody(null);
    setIsModalOpen(false);
    navigate(-1); // Kembali ke halaman sebelumnya
  };
  return (
    <div className="p-3 sm:p-4 md:p-6 flex-1 bg-white h-screen overflow-hidden">
      <div className="flex justify-end items-center mr-2 sm:mr-4 md:mr-8 h-[3vh]">
        <i className="bx bxs-user mr-2 sm:mr-4 text-2xl sm:text-3xl md:text-4xl text-orange-400" />
        <h2 className="text-sm sm:text-base">Admin2</h2>
      </div>
      <div className="h-[11vh]">
        <div className="flex items-center gap-2 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-2xl text-black font-bold whitespace-nowrap">
            Create Feedback
          </h1>
          <div className="w-full h-px bg-gray-800" />
        </div>
        <p className="text-xs sm:text-sm text-gray-600">Report feed</p>
      </div>
      <div className="bg-gray-200 rounded-lg shadow-md h-[85vh] overflow-auto">
        <div className="p-3 sm:p-4 md:p-6">
          <div className="bg-orange-50 rounded-lg p-3 sm:p-4 md:p-4">
            <h2 className="text-lg sm:text-md font-semibold mb-4">
              New Feedback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-0.5 lg:mb-1">
                  Title Report
                </label>
                <input
                  type="text"
                  name="title"
                  value={feedback.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full h-8 lg:h-10 text-sm sm:text-base"
                  placeholder="Masukkan Judul.."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-0.5 lg:mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={feedback.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full h-8 lg:h-10 text-sm sm:text-base p-1"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={feedback.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full text-sm sm:text-base p-2 h-20 sm:h-24 md:h-28"
                  placeholder="Tulis Deskripsi.."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    accept=".jpg,.png,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <i className="text-2xl sm:text-3xl md:text-4xl mb-2">
                        📁
                      </i>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Please Upload A JPG, PNG, Or JPEG Image.
                        <br className="hidden sm:block" />
                        Keep The File Size Under 2MB.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 sm:space-x-4 pt-2">
                <button
                  type="button"
                  className="btn btn-error text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                  onClick={() => navigate(-1)}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn btn-success text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                >
                  SUBMIT
                </button>
              </div>
              <Alert
                isOpen={isModalOpen}
                onClose={closeModal}
                message={errorBody ? errorBody : "Feedback telah terkirim."}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;

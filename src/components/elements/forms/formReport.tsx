import { useEffect, useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
import api from "../../../services/api";
import { CategoryResponse } from "../../../types/category-type";
import { ComplaintType } from "../../../types/complaint-type";
import { AxiosError } from "axios";

type Categories = CategoryResponse[];

const FormReport = () => {
  const [categories, setCategories] = useState<Categories>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorBody, setErrorBody] = useState<string | null>(null);
  const [previewEvidence, setPreviewEvidence] = useState<string | null>(null);
  const [complaint, setComplaint] = useState<ComplaintType>({
    _id: "",
    title: "",
    content: "",
    date_event: "",
    location: "",
    feedback_id: "",
    category: { _id: "", name: "" },
    evidence: null,
    is_deleted: false,
  });

  // Fetch categories
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        const sortedCategories = res.data.data.sort(
          (a: CategoryResponse, b: CategoryResponse) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setCategories(sortedCategories);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err.response?.data || err);
      });
  }, []);

  // Clean up preview evidence
  useEffect(() => {
    return () => {
      if (previewEvidence) {
        URL.revokeObjectURL(previewEvidence);
      }
    };
  }, [previewEvidence]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: name === "category" ? { ...prev.category, _id: value } : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setComplaint((prev) => ({
        ...prev,
        evidence: file,
      }));
      setPreviewEvidence(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!complaint.category._id) {
      setErrorBody("Please select a category");
      setIsModalOpen(true);
      return;
    }

    const requestBody = new FormData();
    requestBody.append("title", complaint.title);
    requestBody.append("content", complaint.content);
    requestBody.append("date_event", complaint.date_event);
    requestBody.append("location", complaint.location);
    requestBody.append("category", complaint.category._id);
    if (complaint.evidence) {
      requestBody.append("evidence", complaint.evidence);
    }

    try {
      api.post("/complaints", requestBody);
      setComplaint({
        _id: "",
        title: "",
        content: "",
        date_event: "",
        location: "",
        feedback_id: "",
        category: { _id: "", name: "" },
        evidence: null,
        is_deleted: false,
      });
      setErrorBody(null);
      setIsModalOpen(true);
    } catch (err: unknown) {
      let errorMessage = "Error submitting complaint";
      if (err instanceof AxiosError && err.response?.data) {
        errorMessage = err.response.data.errors || errorMessage;
      }
      setErrorBody(errorMessage);
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setComplaint({
      _id: "",
      title: "",
      content: "",
      date_event: "",
      location: "",
      feedback_id: "",
      category: { _id: "", name: "" },
      evidence: null,
      is_deleted: false,
    });
    setPreviewEvidence(null);
  };

  const closeModal = () => {
    setErrorBody(null);
    setIsModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 pb-16 lg:pb-8 px-4 h-3/4 lg:w-full bg-gray-100 rounded-lg"
    >
      <div className="flex flex-col lg:flex-row space-x-4 mt-8">
        <div className="flex flex-col space-y-4 w-full lg:w-1/2">
          <TextInput
            name="title"
            placeholder="Judul laporan anda.."
            value={complaint.title}
            onChange={handleInputChange}
            type="text"
            icon="bx bx-copy-alt"
            required={true}
          />
          <TextArea
            name="content"
            placeholder="Isi laporan anda.."
            value={complaint.content}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date_event"
            value={complaint.date_event}
            onChange={handleInputChange}
            required={true}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <TextInput
            name="location"
            placeholder="Masukkan lokasi kejadian"
            value={complaint.location}
            onChange={handleInputChange}
            type="text"
            icon="bx bxs-edit-location"
            required={false}
          />
          <select
            name="category"
            value={complaint.category._id}
            onChange={handleInputChange}
            className="input input-bordered w-full h-8 lg:h-10 text-sm sm:text-base"
          >
            <option disabled value="">
              Pilih Kategori Laporan
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <label className="lg:w-1/2 flex flex-col items-center cursor-pointer">
          <span className="text-gray-600 mb-2 mt-2">Upload Bukti</span>
          <div
            className={`flex flex-col items-center justify-center space-x-2 border border-gray-300 rounded-md ${
              previewEvidence ? "p-1" : "p-16"
            } text-gray-300`}
          >
            {previewEvidence ? (
              <>
                <img
                  src={previewEvidence}
                  alt="Preview Evidence"
                  className="object-cover rounded-sm w-96 h-auto"
                />
                <span className="text-slate-600 text-sm mt-2">
                  {complaint.evidence?.name}
                </span>
              </>
            ) : (
              <>
                <i className="bx bx-image-add text-6xl"></i>
                <span className="flex flex-col text-xs text-center">
                  Please upload a JPG, PNG, or JPEG image.
                  <span>Keep the file size under 2MB.</span>
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-600"
        >
          CANCEL
        </Button>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          SUBMIT
        </Button>
        <Alert
          isOpen={isModalOpen}
          onClose={closeModal}
          message={
            errorBody ? errorBody : "Keluhan anda telah dikirim ke Admin."
          }
        />
      </div>
    </form>
  );
};

export default FormReport;

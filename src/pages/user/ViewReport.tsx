import { ReactNode, useEffect, useState } from "react";
import SideBar from "../../components/elements/Sidebar/sidebar";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import ImagePreviewFromAPI from "../../components/ImagePreview";
import classNames from "classnames";
import { useCategories } from "../../hooks/history/categories";

interface Complaint {
  id: ReactNode;
  title: string;
  content: string;
  date: string;
  location: string;
  category: string;
  evidence: string | File;
  status: string;
}

const ViewReport = () => {
  const { id } = useParams<{ id: string }>(); // Mengambil ID dari URL
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const { categories } = useCategories();

  useEffect(() => {
    const fetchComplaintDetail = async () => {
      try {
        const resp = await api.get(`users/complaints/`);
        const complaints = resp.data.data.complaints;

        const foundComplaint = complaints.find(
          (comp: { _id: string }) => comp._id === id
        );

        if (foundComplaint) {
          const categoryName =
            categories.find(
              (category) => category._id === foundComplaint.category
            )?.name || "Unknown Category";

          setComplaint({
            id: foundComplaint._id,
            title: foundComplaint.title,
            content: foundComplaint.content,
            date: foundComplaint.date_event,
            location: foundComplaint.location,
            category: categoryName, // Menggunakan nama kategori
            evidence: foundComplaint.evidence,
            status: foundComplaint.current_status,
          });
        } else {
          console.log("Complaint not found");
        }
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    if (id) {
      fetchComplaintDetail();
    }
  }, [id, categories]);

  if (!complaint) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="lg:flex lg:flex-col lg:bg-gray-50 lg:p-8 rounded-lg mt-4">
        <SideBar isOpen={false} />
        <h1 className="bg-orange-500 text-white text-xl font-bold text-center p-4 rounded-lg mb-8 shadow-md">
          Detail Laporan - {id}
        </h1>
        <div className="bg-transparent lg:bg-white flex flex-col items-center py-8 lg:px-8 rounded-lg lg:shadow-lg">
          <div className="flex flex-col lg:flex-row items-center lg:items-start rounded-lg space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-4xl">
            {complaint?.evidence ? (
              <div className="w-full lg:w-1/2">
                <ImagePreviewFromAPI
                  alt="Complaint"
                  image={complaint.evidence}
                />
              </div>
            ) : (
              <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg shadow-sm h-48">
                No Image Available
              </div>
            )}
            <div className="bg-white w-full sm:w-1/2 p-6 rounded-lg border border-gray-300">
              <h1 className="font-bold text-3xl">Laporan Pengaduan</h1>
              <hr className="border border-black my-4" />
              <p className="flex text-xl lg:text-lg">
                Status:
                <span
                  className={classNames("px-4 ml-4 text-white rounded-lg", {
                    "bg-green-500": complaint.status === "submitted",
                    "bg-orange-500": complaint.status === "processing",
                    "bg-blue-500": complaint.status === "accepted",
                    "bg-red-500": complaint.status === "rejected",
                  })}
                >
                  {complaint.status}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-700 mb-2">
                Judul Laporan:{" "}
                <span className="font-normal text-gray-600">
                  {complaint.title}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-700 mb-2">
                Tanggal Kejadian:{" "}
                <span className="font-normal text-gray-600">
                  {complaint.date?.split(",")[0]}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-700 mb-2">
                Lokasi:{" "}
                <span className="font-normal text-gray-600">
                  {complaint.location}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-700">
                Kategori:{" "}
                <span className="font-normal text-gray-600">
                  {complaint.category}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-xl font-semibold text-gray-800 my-4">
              Deskripsi
            </h1>
            <p className="bg-white rounded-lg p-6 text-gray-700 border border-gray-300">
              {complaint.content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewReport;

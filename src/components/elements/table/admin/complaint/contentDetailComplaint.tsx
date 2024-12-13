import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ImagePreviewFromAPI from "../../../../ImagePreview";
import { ComplaintResponse } from "../../../../../types/complaint-type";
import PageHeader from "../../../../PageHeader";
import Card from "../../../../Card";
import api from "../../../../../services/api";
import Button from "../../../modal/button/button";
import { AxiosError } from "axios";

const ComplaintDetail: React.FC = () => {
  const { complaintId } = useParams<{ complaintId: string }>();
  const [complaint, setComplaint] = useState<ComplaintResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/complaints/${complaintId}`)
      .then((response) => {
        setComplaint(response.data.data);
        console.log("Complaint: ", response.data.data);
      })
      .catch((error) => {
        console.error(error.response.errors);
      });
  }, [complaintId]);

  const navigate = useNavigate();
  const handleCreateReport = async () => {
    try {
      try {
        const response = await api.post(
          `/admin-feedback/${complaintId}/process`
        );
        const data = response.data.current_status;
        return data;
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 409) {
          Swal.fire({
            title: "Konflik!",
            text: "Laporan sudah diproses sebelumnya.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          console.error(error);
        }
      }
      setLoading(true);
      Swal.fire({
        title: "Sudah Yakin?",
        text: "Ingin Memberi Feedback?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Beri Feedback",
        cancelButtonText: "Batal",
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate(`/admin/complaints/${complaintId}/feedback`);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex-1 bg-white">
      <PageHeader
        title="Detail Complaint"
        description="Detail Complaint From User"
      />
      <Card title={"Detail Pengaduan"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            {complaint?.evidence ? (
              <ImagePreviewFromAPI alt="Complaint" image={complaint.evidence} />
            ) : (
              "No Image Available"
            )}
          </div>
          <div className="justify-center flex">
            <div className="card bg-base-100 shadow-xl w-full h-fit">
              <div className="card-body p-3">
                <div className="mt-1">
                  <table className="table-auto w-full border-separate border-spacing-2 m-0 p-0">
                    <tbody>
                      <tr>
                        <td className="font-semibold pr-1">Tanggal Event</td>
                        <td>: {complaint?.date_event?.split(",")[0]}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-1">Tanggal Laporan</td>
                        <td>: {complaint?.date_event?.split(",")[0]}</td>
                      </tr>
                      <hr />
                      <tr>
                        <td className="font-semibold pr-1">Kategori Laporan</td>
                        <td>: {complaint?.category?.name || ""}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-1">Judul Laporan</td>
                        <td>: {complaint?.title}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-1">Lokasi</td>
                        <td>: {complaint?.location || ""}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-8">
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body">
              <h2 className="card-title text-md">Deskripsi</h2>
              {complaint?.content || ""}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <button
            onClick={() => navigate("/admin/complaints")}
            className="px-6 py-2 bg-[#FF8C42] text-white rounded-md hover:bg-[#ff7a1f] disabled:opacity-50 transition-colors"
            children="BACK"
            type="button"
          />
          <Button
            onClick={handleCreateReport}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-2"
            type="button"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Loading...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Feeback
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ComplaintDetail;

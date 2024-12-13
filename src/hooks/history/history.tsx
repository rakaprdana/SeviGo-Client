import { useState, useEffect } from "react";
import { useCategories } from "./categories";
import api from "../../services/api";

interface ComplaintProps {
  _id: string;
  admin_feedback: string;
  title: string;
  content: string;
  date: string;
  date_event: string;
  location: string;
  category: string;
  evidence: File | null;
  status: string;
  current_status?: string;
  updated_at: string;
}

const parseDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split(", ");
  const [day, month, year] = datePart.split("/");
  const [hours, minutes, seconds] = timePart.split(".");
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
};

export const useComplaintsWithCategories = () => {
  const [historyData, setHistoryData] = useState<ComplaintProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { categories } = useCategories(); // Ambil data kategori dari hook

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        const resp = await api.get("users/complaints");
        const complaints: ComplaintProps[] = resp.data.data.complaints.map(
          (complaint: ComplaintProps) => {
            const categoryName =
              categories.find((category) => category._id === complaint.category)
                ?.name || "Unknown Category";

            return {
              _id: complaint._id,
              admin_feedback: complaint.admin_feedback,
              title: complaint.title,
              description: complaint.content,
              date: complaint.date_event,
              location: complaint.location,
              category: categoryName,
              attachment: complaint.evidence,
              status: complaint.current_status,
              updated_at: complaint.updated_at,
            };
          }
        );

        const sortedComplaints = complaints.sort((a, b) => {
          return (
            parseDate(b.updated_at).getTime() -
            parseDate(a.updated_at).getTime()
          );
        });

        console.log("Sorted complaints: ", sortedComplaints);

        setHistoryData(sortedComplaints);
      } catch (err) {
        console.error("Fetch complaints error: ", err);
        setError("Failed to load complaints");
      }
    };

    if (categories.length > 0) {
      loadHistoryData(); // Pastikan data kategori tersedia sebelum memuat complaint
    }
  }, [categories]);

  return { historyData, error };
};

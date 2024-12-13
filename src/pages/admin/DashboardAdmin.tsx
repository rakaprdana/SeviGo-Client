import React, { useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import ComplaintBarChart from "../../components/barChart";
import StatsCard from "../../components/StatsCard";
import { FaUsers, FaFileAlt } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdTimer } from "react-icons/io";
import { useNameProfile } from "../../hooks/nameProfile";

// Interface untuk tipe data API
interface Category {
  _id: string;
  name: string;
  has_complaints: number;
  percentage: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    totalComplaints: number;
    categoryPercentages: Category[];
  };
}

const DashboardAdmin: React.FC = () => {
  // State untuk data API dan kontrol loading/error
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { name } = useNameProfile();
  const fetchStatisticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: responseData }: { data: ApiResponse } = await api.get(
        "/statistics/category-percentages"
      );
      if (responseData.code === 200) {
        setApiData(responseData);
        setFetchError(null); // Reset error jika sebelumnya ada error
      } else {
        setFetchError("Error fetching data");
      }
    } catch {
      setFetchError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchStatisticsData();
  }, [fetchStatisticsData]);

  // Komponen Loading Placeholder
  const LoadingPlaceholder: React.FC = () => (
    <div className="w-full h-72 bg-gray-200 rounded-lg animate-pulse"></div>
  );

  // Komponen Error Message
  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-red-500 font-semibold">{message}</div>
  );

  return (
    <div className="flex flex-col m-4">
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
          <h2 className="text-xl">Hi, {name}!</h2>
        </div>
      </div>
      {/* Bagian Statistik Pengguna dan Laporan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <StatsCard
          title="Total Pengguna"
          icon={<FaUsers />}
          endpoint="/statistics/users"
        />
        <StatsCard
          title="Total Laporan Masuk"
          icon={<FaFileAlt />}
          endpoint="/statistics/complaints"
        />
      </div>

      {/* Bagian Statistik Status Laporan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <StatsCard
          title="Laporan Di Terima"
          icon={<AiOutlineCheckCircle />}
          endpoint="/statistics/complaints-finished"
        />
        <StatsCard
          title="Laporan Di Tolak"
          icon={<AiOutlineCloseCircle />}
          endpoint="/statistics/complaints-rejected"
        />
        <StatsCard
          title="Laporan Di Proses"
          icon={<IoMdTimer />}
          endpoint="/statistics/complaints-processing"
        />
      </div>

      {/* Bagian Grafik Data Laporan */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 p-4 w-full">
        <h1 className="text-xl font-semibold mb-4">Complaint Data</h1>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : fetchError ? (
          <ErrorMessage message={fetchError} />
        ) : (
          apiData && <ComplaintBarChart data={apiData} />
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;

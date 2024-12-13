import React, { useEffect, useState } from "react";
import api from "../services/api";

interface StatsCardProps {
  title: string;
  icon: JSX.Element;
  endpoint: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    total: number;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, icon, endpoint }) => {
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        const responseData: ApiResponse = response.data;
        if (responseData.code === 200) {
          setData(responseData.data.total);
        } else {
          setError("Error fetching data");
        }
      } catch (error: unknown) {
        console.log(error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
      <div className="text-4xl md:text-6xl text-orange-400">{icon}</div>
      <div className="ml-4 md:ml-8">
        <h1 className="font-bold text-lg md:text-xl">{title}</h1>
        {loading ? (
          <p className="text-sm md:text-base">Loading...</p>
        ) : error ? (
          <p className="text-sm md:text-base text-red-500">{error}</p>
        ) : (
          <div className="text-lg">{data}</div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

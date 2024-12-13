import { useState, useEffect } from "react";
import api from "../../../services/api";

interface CardProps {
  title: string;
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
const CardAmount: React.FC<CardProps> = ({ title, endpoint }) => {
  const [data, setData] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        const responseData: ApiResponse = response.data;
        if (responseData.code === 200) {
          setData(responseData.data.total);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [endpoint]);
  return (
    <>
      <div className="bg-slate-100 flex flex-col justify-center items-center p-4 rounded-lg">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-2xl">{data}</p>
      </div>
    </>
  );
};

export default CardAmount;

import React, { useEffect, useState } from "react";
import ComplaintTable from "../../components/elements/table/admin/complaint/ComplaintTable";
import api from "../../services/api";
import { ComplaintType } from "../../types/complaint-type";
import { useDispatch } from "react-redux";
import {
  setComplaintsData,
  searchComplaints,
} from "../../Redux/reducer/complaintsSlice";
import { useNameProfile } from "../../hooks/nameProfile";

const ComplaintList: React.FC = () => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [complaints, setComplaints] = useState<ComplaintType[]>([]);
  const [filteredData, setFilteredData] = useState<ComplaintType[]>([]);
  const dispatch = useDispatch();
  const { name } = useNameProfile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/complaints");
        const data = response.data.data as ComplaintType[];
        setComplaints(data);
        setFilteredData(data);
        dispatch(setComplaintsData(data));
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Update filtered data setiap kali `query` berubah
  useEffect(() => {
    const filtered = complaints.filter((complaint) =>
      complaint.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset halaman ke awal setelah pencarian
  }, [query, complaints]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(searchComplaints(e.target.value)); // Jika pencarian perlu dicatat di Redux
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-black font-bold mb-2">Complaint List</h1>
          <p className="text-gray-600">Report feed</p>
        </div>
        <div className="flex items-center">
          <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
          <h2 className="text-xl">Hi, {name}!</h2>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          {/* Input pencarian */}
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full sm:w-64 bg-white"
            value={query}
            onChange={handleSearch}
          />
          <div>
            {/* Pilihan jumlah entri per halaman */}
            <select
              className="select select-bordered bg-white"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        {/* Tabel keluhan */}
        <ComplaintTable complaints={paginatedData} />
        {/* Navigasi halaman */}
        <div className="mt-4 flex justify-between">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="btn btn-outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ComplaintList;

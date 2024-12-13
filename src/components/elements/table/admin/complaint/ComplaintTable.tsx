import React from "react";
import { ComplaintResponse } from "../../../../../types/complaint-type";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Button from "../../../modal/button/button";
import api from "../../../../../services/api";

interface ComplaintTableProps {
  complaints: ComplaintResponse[];
}

const ComplaintTable: React.FC<ComplaintTableProps> = ({ complaints }) => {
  const handleClickDelete = async (complaintId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white overflow-x-auto rounded-lg">
      <div className="overflow-y-auto h-[28rem]">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-300 rounded-t-md z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                ID Report
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 min-w-[100px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {complaints.length > 0 ? (
              complaints.map((complaint: ComplaintResponse) => (
                <tr
                  key={complaint._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint.title}
                  </td>
                  <td>
                    <span
                      className={classNames(
                        "p-2  rounded-full text-sm text-white text-center",
                        {
                          "bg-green-500":
                            complaint.current_status === "Submitted",
                          "bg-orange-500":
                            complaint.current_status === "Processing",
                          "bg-blue-500":
                            complaint.current_status === "Finished",
                          "bg-red-500": complaint.current_status === "Rejected",
                        }
                      )}
                    >
                      {complaint.current_status}
                    </span>
                  </td>
                  <td className="flex py-12 px-4 space-x-2 ">
                    <Link to={`/admin/complaints/${complaint._id}`}>
                      <Button
                        children="View"
                        className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                      />
                    </Link>
                    <Button
                      onClick={() => handleClickDelete(complaint._id)}
                      children="Delete"
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;

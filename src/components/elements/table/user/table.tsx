import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../../../Redux/store";
import {
  setHistoryData,
  searchHistory,
} from "../../../../Redux/reducer/historySlice";
import { useComplaintsWithCategories } from "../../../../hooks/history/history";
import classNames from "classnames";
import Button from "../../modal/button/button";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const dispatch: AppDispatch = useDispatch();
  const { filteredData } = useSelector((state: RootState) => state.history);
  const { historyData } = useComplaintsWithCategories();

  useEffect(() => {
    if (historyData) {
      dispatch(setHistoryData(historyData));
    }
  }, [historyData, dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchHistory(e.target.value));
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian dilakukan
  };

  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div className="w-[22rem] lg:w-full">
        <div className="bg-gray-50 p-4 rounded-lg shadow h-[32rem] lg:h-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded w-3/4 lg:w-1/3"
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-y-auto h-96 lg:h-1/2 rounded-lg">
            <table className="w-full text-left bg-white shadow-md">
              <thead>
                <tr className="sticky top-0 bg-gray-200">
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Category</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.date?.split(",")[0]}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2 border-b">
                        <span
                          className={classNames(
                            "p-2  rounded-full text-sm text-white text-center",
                            {
                              "bg-green-500": item.status === "Submitted",
                              "bg-orange-500": item.status === "Processing",
                              "bg-blue-500": item.status === "Finished",
                              "bg-red-500": item.status === "Rejected",
                            }
                          )}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2 border-b">
                        <Link
                          to={
                            item.admin_feedback
                              ? `/feedback/view/${item.admin_feedback}`
                              : "#"
                          }
                        >
                          <Button
                            children="Feedback"
                            className={`bg-orange-500 text-white px-4 py-1 rounded ${
                              !item.admin_feedback &&
                              "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!item.admin_feedback}
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-8 py-4 text-center">No history found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-end mt-4">
            <div className="btn-group space-x-4">
              {[...Array(totalPage)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`btn ${
                    currentPage === i + 1 ? "btn-active" : ""
                  } px-8`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

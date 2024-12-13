import { Link } from "react-router-dom";
import { useComplaintsWithCategories } from "../../../../hooks/history/history";
import { AppDispatch, RootState } from "../../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  searchHistory,
  setHistoryData,
} from "../../../../Redux/reducer/historySlice";
import classNames from "classnames";
import Button from "../../modal/button/button";

const HistoryTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredData } = useSelector((state: RootState) => state.history);
  const { historyData, error } = useComplaintsWithCategories();

  useEffect(() => {
    if (historyData) {
      dispatch(setHistoryData(historyData));
    }
  }, [historyData, dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchHistory(e.target.value));
  };

  return (
    <>
      <div className="w-[22rem] lg:w-full">
        <div className="flex items-center pb-8">
          <h1 className="py-4 ml-4 text-3xl">Riwayat Pelaporan</h1>
          <hr className="border border-black w-2/3 " />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded w-3/4 lg:w-1/3"
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-y-auto h-96 lg:h-[32rem]">
            <table className="w-full text-left bg-white rounded-lg shadow-md">
              <thead>
                <tr className="sticky top-0 bg-gray-200 text-center">
                  <th className="p-2 border-b">ID Report</th>
                  <th className="p-2 border-b">Category</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item._id}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.date?.split(",")[0]}</td>
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
                      <td className="flex items-center justify-center pr-2 py-12 space-x-2">
                        <Link to={`/dashboard/view/${item._id}`}>
                          <Button
                            children="View"
                            className="bg-orange-500 text-white px-4 py-1 rounded"
                          />
                        </Link>
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
        </div>
      </div>
    </>
  );
};

export default HistoryTable;

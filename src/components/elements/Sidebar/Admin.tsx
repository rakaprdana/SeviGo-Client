import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../middlewares/AuthContext";
import LinkSideBar from "./Link/linksidebar";

const AdminSideBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <hr className="border border-white opacity-30 w-4/5" />
        <h1 className="text-xl ">Admin Panel</h1>
      </div>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="w-full">
          <LinkSideBar
            label="Dashboard"
            to="/admin/dashboard"
            icon="bx bxs-dashboard"
          />
          <LinkSideBar
            label="User Management"
            to="/admin/user-management"
            icon="bx bxs-user"
          />
          <LinkSideBar
            label="Kategori"
            to="/admin/categories"
            icon="bx bx-category"
          />
          <LinkSideBar
            label="Complaint List"
            to="/admin/complaints"
            icon="bx bx-list-ul"
          />
        </div>
        <button
          onClick={handleLogOut}
          className="border border-white flex items-center justify-center py-2 w-1/2 mb-4 space-x-8 rounded-xl hover:bg-slate-50 hover:text-black duration-700"
        >
          <i className="bx bx-log-out mr-4" />
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminSideBar;

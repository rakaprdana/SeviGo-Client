import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../middlewares/AuthContext";
import LinkSideBar from "./Link/linksidebar";

const UserSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <hr className="opacity-30 w-4/5 my-4 ml-6" />
      <div className="flex flex-col items-center justify-between h-full">
        <div className="w-full">
          <LinkSideBar
            label="Dashboard"
            to="/dashboard"
            icon="bx bxs-dashboard"
          />
          <LinkSideBar label="Profile" to="/profile" icon="bx bxs-user" />
          <LinkSideBar
            label="Pengaduan Baru"
            to="/dashboard/new-report"
            icon="bx bxs-notepad"
          />
          <LinkSideBar label="History" to="/history" icon="bx bx-history" />
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
export default UserSidebar;

import { useLocation } from "react-router-dom";
import Logo from "../../../assets/image/logo-SeviGO.png";
import AdminSideBar from "./Admin";
import UserSidebar from "./User";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar?: () => void;
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    return (
        <div
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-orange-400 text-white transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:${isOpen ? "block" : "hidden"}`}
        >
            <div className="flex flex-col w-full h-full">
                <div className="flex items-center space-x-4 mt-4 ml-8">
                    <img src={Logo} alt="SeviGo Logo" className="border border-yellow-400 rounded-full w-12" />
                    <h1 className="text-3xl font-bold">SeviGo</h1>
                </div>
                <div className="mt-8">
                    {isAdmin ? <AdminSideBar /> : <UserSidebar />}
                </div>
                <div className="flex flex-row items-center justify-center mx-4 p-2 rounded-xl hover:-translate-y-2 duration-700 mt-auto">
                    <button
                        className="py-2 bg-orange-600 rounded-lg text-white hover:bg-gray-700 
                        duration-300 items-center justify-center mt-auto mb-1 px-9"
                        onClick={toggleSidebar}
                    >
                       Tutup Sidebar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

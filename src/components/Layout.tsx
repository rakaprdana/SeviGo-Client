import React, { useState } from 'react';
import Sidebar from './elements/Sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex relative">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                className={`${isSidebarOpen ? "fixed inset-0 z-40" : "hidden"
                    } md:block md:relative md:z-auto w-1/5 h-screen bg-orange-400 text-white`}
            />
            <div
                className={`flex-grow relative p-4 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"
                    }`}
            >
                <button
                    className={`fixed top-4 left-4 z-50 bg-orange-500 p-2 rounded-full text-white shadow-lg ${isSidebarOpen ? "hidden" : ""
                    }`}
                    onClick={toggleSidebar}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                        />
                    </svg>
                </button>
                <main className="container mx-auto z-40">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

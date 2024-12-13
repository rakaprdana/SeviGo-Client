import { Link } from "react-router-dom";
import Table from "../../components/elements/table/user/table";
import { useNameProfile } from "../../hooks/nameProfile";

const DashboardUser = () => {
  const { name } = useNameProfile();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full lg:p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 mt-12 lg:mt-0 w-2/3 lg:w-full">
          <h1 className="ml-4 text-4xl font-bold">Dashboard</h1>
          <div className="mt-4 flex items-center">
            <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
            <h2 className="text-xl">Hi, {name}!</h2>
          </div>
        </div>
        {/* Tautan Pengaduan */}
        <div className="w-[22rem] lg:w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link to="/dashboard/new-report">
            <div className="bg-slate-50 flex items-center py-6 px-8 lg:px-12 text-xl space-x-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <i className="bx bxs-notepad text-orange-500 text-4xl" />
              <h1>Buat Pengaduan</h1>
            </div>
          </Link>
          <Link to="/history">
            <div className="bg-slate-50 flex items-center py-6 px-8 lg:px-12 text-xl space-x-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <i className="bx bx-history text-orange-500 text-4xl" />
              <h1>Riwayat Pengaduan</h1>
            </div>
          </Link>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default DashboardUser;

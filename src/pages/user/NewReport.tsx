import FormReport from "../../components/elements/forms/formReport";
import SideBar from "../../components/elements/Sidebar/sidebar";

const NewReport = () => {
  return (
    <>
      <div className="flex">
        <SideBar isOpen={false} />
        <div className="w-full">
          <div className="mt-4 flex items-center">
            <h1 className="my-8 ml-8 text-3xl">Buat Laporan Baru</h1>
            <hr className="border border-black w-4/5" />
          </div>
          <FormReport />
        </div>
      </div>
    </>
  );
};

export default NewReport;

import SideBar from "../../components/elements/Sidebar/sidebar";
import HistoryTable from "../../components/elements/table/user/historytable";

const HistoryPage: React.FC = () => {
  return (
    <>
      <div>
        <SideBar isOpen={false} />
        <HistoryTable />
      </div>
    </>
  );
};

export default HistoryPage;

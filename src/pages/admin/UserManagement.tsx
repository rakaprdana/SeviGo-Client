import Table from "../../components/elements/table/admin/userTable";
import { useNameProfile } from "../../hooks/nameProfile";

const UserManagement = () => {
  const { name } = useNameProfile();
  return (
    <>
      <div className="flex space-x-4">
        <div className="w-full">
          <div className="flex justify-between items-center mx-4">
            <div className="flex flex-col space-y-4 w-3/4">
              <h1 className="text-3xl font-bold">User Mangement</h1>
              <hr className="border border-black w-3/4" />
            </div>
            <div className="flex items-center">
              <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
              <h2 className="text-xl">Hi, {name}!</h2>
            </div>
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};

export default UserManagement;

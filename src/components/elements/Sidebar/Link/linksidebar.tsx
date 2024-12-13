import { NavLink } from "react-router-dom";

interface LinkProps {
  icon: string;
  label: string;
  to: string;
}

const LinkSideBar = ({ label, icon, to }: LinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-black font-medium ${
          isActive
            ? "bg-slate-100 text-orange-400 font-bold text-xl" : ""
        }`
      }
    >
      <div className="bg-white flex flex-row items-center mt-4 mx-4 p-2 space-x-4 rounded-xl hover:bg-slate-50 hover:-translate-y-2 transition-transform duration-300 hover:text-xl hover:transition-transform">
        <div className="text-orange-400 text-4xl">
          <i className={icon}></i>
        </div>
        <p>{label}</p>
      </div>
    </NavLink>
  );
};

export default LinkSideBar;

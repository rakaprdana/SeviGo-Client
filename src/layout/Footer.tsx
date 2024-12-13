import { useNavigate } from "react-router-dom";
import Logo from "../assets/image/logo-SeviGO.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer className="bg-slate-50 flex flex-col items-center px-8 pt-4 rounded-t-xl">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="" className="w-20 lg:w-32 rounded-full" />
          <p className="text-3xl lg:text-6xl font-bold">Sevigo</p>
        </div>

        <div className="flex items-center mt-4 space-x-4">
          <button
            className="text-black text-md hover:text-orange-500 duration-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="text-black text-md hover:text-orange-500 duration-700"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        <p className="text-sm my-4">© SeviGo 2024</p>
      </footer>
    </>
  );
};

export default Footer;

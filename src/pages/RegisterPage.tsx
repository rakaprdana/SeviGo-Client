import React, { useState, ChangeEvent, FormEvent } from "react";
import backgroundImage from "../assets/image/login-bg.jpg";
import "boxicons/css/boxicons.min.css";
import logoSevigo from "../assets/image/logo-SeviGO.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Import API
import ErrorMessage from "../components/elements/forms/ErrorMessage";
import TextInput from "../components/elements/modal/input/TextInput";
import { AxiosError } from "axios";

interface FormData {
  nik: string;
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nik: "",
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]); // State untuk menyimpan daftar error
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors([]); // Reset errors

    try {
      const response = await api.post("/users/register", formData);
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof AxiosError && err.response?.data.errors) {
        setErrors([err.response.data.errors || "Register failed"]);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center z-10 relative mb-4">
        <div className="flex flex-row items-center">
          <Link to="/" className="cursor-pointer flex items-center">
            <img
              src={logoSevigo}
              alt="Sevigo Logo"
              className="mb-2"
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
            <h1
              className="mb-2 ml-4 text-2xl font-bold "
              style={{ color: "white", fontSize: "50px" }}
            >
              SeviGo
            </h1>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg  lg:w-96 m-3 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Register
          </h2>
          {errors.length > 0 && <ErrorMessage messages={errors} />}{" "}
          {/* Menampilkan pesan error */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              placeholder="NIK"
              icon="bx bx-id-card"
              required
              aria-label="NIK"
            />
            <TextInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              icon="bx-user"
              required
              aria-label="Full name"
            />
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              icon="bx-envelope"
              onChange={handleChange}
              required
              aria-label="email"
            />
            <TextInput
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              icon="bx-lock-alt"
              onChange={handleChange}
              required
              aria-label="password"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              REGISTER
              <i className="bx bx-right-arrow-alt text-xl" />
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login" // Tautan ke halaman login
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 inline-flex items-center gap-1"
              aria-label="Login"
            >
              Login here
              <i className="bx bx-user-check text-lg" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useEffect, useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
import api from "../../../services/api";
import ImagePreview from "../../ImagePreview";
import { AxiosError } from "axios";

interface UserData {
  avatar: string | File;
  _id: string;
  nik: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  image: File | null;
  address: string;
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
}

const FormProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [axiosError, setAxiosError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    _id: "",
    nik: "",
    name: "",
    email: "",
    role: "",
    is_verified: false,
    image: null,
    avatar: "",
    address: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  //Get Data Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("users/profile");
        if (response.data.code === 200 && response.data.status === "OK") {
          setUserData(response.data.data);
          console.log("Data: ", response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetch: ", error);
      }
    };
    fetchProfile();
  }, []);

  // Clean up preview image
  useEffect(() => {
    if (!preview) return;
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const avatar = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      avatar: avatar,
    }));

    // Preview image
    const imageUrl = avatar ? URL.createObjectURL(avatar) : "";
    setPreview(imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", userData.name);
    formPayload.append("email", userData.email);
    formPayload.append("address", userData.address);
    if (userData.old_password)
      formPayload.append("old_password", userData.old_password);
    if (userData.new_password)
      formPayload.append("new_password", userData.new_password);
    if (userData.confirm_password)
      formPayload.append("confirm_password", userData.confirm_password);
    if (userData.avatar) formPayload.append("avatar", userData.avatar);

    // Debugging the payload
    for (const [key, value] of formPayload.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await api.put("/users/profile", formPayload);
      console.log("Response: ", response.data.data);
      setUserData(response.data.data);
      setIsModalOpen(true);
      setAxiosError(null);
    } catch (err: unknown) {
      const errorMessage =
        (err instanceof AxiosError && err.response?.data?.errors) ||
        "Error updating profile";
      console.log("Error updating profile: ", errorMessage);
      setAxiosError(errorMessage);
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {};
  const closeModal = () => {
    setAxiosError(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 gap-5">
      <div className="w-full mb-6 md:mb-0 mt-4 md:flex-1">
        <h1 className="text-2xl mb-4">Your Profile</h1>
        <div className="card w-full bg-base-100 shadow-xl md:p-2 md:min-w-[17rem]">
          <label className="w-full flex flex-col items-center cursor-pointer">
            <div className="flex justify-center items-center border border-gray-300 rounded-full mt-4 text-gray-400 lg:h-[16rem] lg:w-[16rem] md:w-60 md:h-60">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-64 h-64 rounded-full object-cover aspect-auto box-border md:h-56 md:w-56 lg:w-64 lg:h-64"
                />
              ) : (
                <ImagePreview
                  alt={`${userData.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}-avatar`}
                  image={userData.avatar}
                />
              )}
            </div>
            <p className="mt-4 text-xs text-center p-2">
              Please upload a profile photo (JPG, PNG, JPEG).
              <span>Keep the file size under 2MB.</span>
            </p>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <div className="bg-slate-200 py-2 flex justify-center rounded-lg mb-6">
          <h1>Your Profile</h1>
          <div className="flex items-center">
            <span
              className={`ml-4 ${
                userData.is_verified
                  ? "bg-green-500 rounded-lg text-white px-4"
                  : "bg-red-500 rounded-lg text-white px-4"
              }`}
            >
              {userData.is_verified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
          <h5 className="text-center mb-4">Your NIK: {userData.nik}</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              name="name"
              placeholder="Nama Lengkap"
              value={userData.name}
              onChange={handleInputChange}
              type={"name"}
              icon={"bx bx-user"}
              required={false}
            />

            <TextInput
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              type={"email"}
              icon={"bx bx-envelope"}
              required={false}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-4">
            <TextArea
              name="address"
              placeholder="Alamat"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TextInput
              name="old_password"
              placeholder="Old Password"
              value={userData.old_password || ""}
              onChange={handleInputChange}
              type={""}
              icon={"bx bx-lock-alt"}
              required={false}
            />
            <TextInput
              name="new_password"
              placeholder="New Password"
              value={userData.new_password || ""}
              onChange={handleInputChange}
              type={""}
              icon={"bx bx-lock-alt"}
              required={false}
            />
            <TextInput
              name="confirm_password"
              placeholder="Confirm Password"
              value={userData.confirm_password || ""}
              onChange={handleInputChange}
              type={""}
              icon={"bx bx-lock-alt"}
              required={false}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600"
            >
              CANCEL
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              UPDATE
            </Button>
          </div>

          <Alert
            isOpen={isModalOpen}
            onClose={closeModal}
            message={axiosError ? axiosError : "Pembaharuan tersimpan"}
          />
        </form>
      </div>
    </div>
  );
};

export default FormProfile;

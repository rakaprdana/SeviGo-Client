import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Card from "../../../components/Card";
import PageHeader from "../../../components/PageHeader";
import toast from 'react-hot-toast';

interface FormData {
  name: string;
}

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({ name: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const response = await api.get(`/categories/${id}`);
        setFormData(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
        setError("Gagal mengambil data kategori.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    try {
      const response = await api.put(`/categories/${id}`, formData);
      toast.success('Kategori Berhasil Di Perbarui')
      navigate("/admin/categories");
      console.log(response)
    } catch (err) {
      console.error("Gagal mengupdate kategori:", err);
      setError("Gagal mengupdate kategori.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="p-4">
    <PageHeader title="Edit Category" description="Edit Data Kategori" />
     <Card title={`Kategori - ${formData.name}`}>
     <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <button type="submit" className="btn bg-orange-400 hover:bg-orange-500 hover:text-white w-full">
            Perbarui Kategori
          </button>
        </div>
      </form>
     </Card>
    </div>
  );
};

export default EditCategory;

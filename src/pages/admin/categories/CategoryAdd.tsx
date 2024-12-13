import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import PageHeader from "../../../components/PageHeader";
import toast from "react-hot-toast";

const CategoryAdd: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required.");
      return;
    }
    setLoading(true);

    try {
      await api.post("/categories", { name });
      toast.success("Kategori Berhasil di tambahkan");
      navigate("/admin/categories");
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <PageHeader title="Add Category" description="Create a new category" />
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="form-control">
          <button
            type="submit"
            className={`btn bg-orange-500 text-white hover:bg-orange-400  w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAdd;
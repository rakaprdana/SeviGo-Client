import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import api from "../../../services/api";
import Card from "../../../components/Card";
import PageHeader from "../../../components/PageHeader";

interface Category {
  _id: number;
  name: string;
  description: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <PageHeader title="Category" description="Master Data Kategori" />
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-orange-300 loading-lg"></span>
        </div>
      ) : (
        <Card title={"Daftar Kategori Pengaduan"}>
          <div className="grid-cols-1 p-2">
            <NavLink
              to={"add"}
              className={"btn btn-sm bg-orange-500 text-white"}
            >
              Add New Category
            </NavLink>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="table-auto w-full border-collapse shadow-lg bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-300 text-gray-800 rounded-t-lg">
                <tr>
                  <th className="px-4 py-2 text-left border-b">No</th>
                  <th className="px-4 py-2 text-left border-b">Name</th>
                  <th className="px-4 py-2 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <tr
                      key={category._id}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-4 py-2 border-b">{index + 1}</td>
                      <td className="px-4 py-2 border-b">{category.name}</td>
                      <td className="px-4 py-2 border-b">
                        <NavLink
                          to={`/admin/categories/${category._id}/edit`}
                          className="btn btn-sm bg-orange-400 text-white hover:text-black hover:bg-orange-400 last:mr-2"
                        >
                          Edit
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CategoryList;

import { useState, useEffect } from "react";
import api from "../../services/api";

interface Category {
  _id: string;
  name: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const resp = await api.get("/categories");
        setCategories(resp.data.data); // Simpan data kategori dalam state
      } catch (err) {
        console.error("Fetch categories error: ", err);
        setError("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  return { categories, error };
};

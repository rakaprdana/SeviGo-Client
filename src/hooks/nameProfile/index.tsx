import { useEffect, useState } from "react";
import api from "../../services/api";

export const useNameProfile = () => {
  const [name, setName] = useState<string>();

  useEffect(() => {
    const fetchGetName = async () => {
      try {
        const response = await api.get("/users/profile");
        const result = await response.data;
        if (result.code === 200 && result.status === "OK") {
          setName(result.data.name);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.log("Message: ", error);
      }
    };

    fetchGetName();
  }, []);

  return { name };
};

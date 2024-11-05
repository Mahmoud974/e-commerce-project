import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchElements = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

export const useTemplate = () => {
  return useQuery({
    queryKey: ["get-template"],
    queryFn: () => fetchElements("http://localhost:3000/api/articles"),
  });
};

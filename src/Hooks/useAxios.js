import { useContext, useState, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function useAxios() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const { token } = useContext(AuthContext);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleAxios = useCallback(
    async (url, method = "GET", data = null, params = null, headers = {}) => {
      try {
        const response = await axios({
          method,
          url: `${API_BASE_URL}/api/${url}`,
          data,
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            ...headers,
          },
        });

        setData(response.data.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [API_BASE_URL, token],
  );

  const handleTableList = useCallback(
    async (url, page) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/${url}`, {
          params: {
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        setPagination(response.data.pagination);
        //console.log("handleTableList", response);
      } catch (error) {
        console.log("Error", error);
      }
    },
    [API_BASE_URL, token],
  );

  const handleBulkDelete = useCallback(async (url, data) => {
    try {
      if (data.length == 0) {
        alert("Please select at least one item");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/${url}`,
        { ids: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setData((prev) => prev.filter((row) => !data.includes(row._id)));
    } catch (error) {
      alert(error.response.data.message);
    }
  });

  const handleDelete = useCallback(async (url, id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api${url}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setData((prev) => prev.filter((row) => row._id !== id));
      setData((prev) => prev.filter((row) => row._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
    }
  });

  return {
    data,
    pagination,
    handleAxios,
    handleTableList,
    handleBulkDelete,
    handleDelete,
  };
}

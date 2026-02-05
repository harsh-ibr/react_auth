import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function TagsInput({ value = [], onChange }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const handleSelectChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];

    onChange(values);
  };

  const getAllTags = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tag/get_all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(response.data.data); // [{ _id, name }]
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const tagOptions = tags.map((tag) => ({
    value: tag._id, // ✅ send ID
    label: tag.name, // ✅ show name
  }));

  return (
    <Select
      isMulti
      options={tagOptions}
      value={tagOptions.filter((opt) => value.includes(opt.value))}
      onChange={handleSelectChange}
      placeholder="Select fruits"
    />
  );
}

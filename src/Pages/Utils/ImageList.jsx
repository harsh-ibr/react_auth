import React from "react";
import defaultImage from "@/assets/download.png";

export default function ImageList({ thumbnail }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <>
      <img
        className="rounded"
        style={{ width: 100, height: 100 }}
        src={thumbnail ? API_BASE_URL + "/" + thumbnail : defaultImage}
        onError={(e) => {
          e.target.onerror = null; // prevents infinite loop
          e.target.src = defaultImage;
        }}
      />
    </>
  );
}

import defaultImage from "@/assets/download.png";
export default function ImageFieldPreviou({ image, onChange }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <>
      <div className="mt-2 mb-3">
        <input
          id="file"
          className="form-control"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files[0])}
        />
        <img
          src={
            image
              ? typeof image === "object"
                ? URL.createObjectURL(image) // new uploaded file
                : API_BASE_URL + "/" + image // existing image URL
              : defaultImage // default image
          }
          onError={(e) => {
            e.target.onerror = null; // prevents infinite loop
            e.target.src = defaultImage;
          }}
          className="img-fluid m-2 rounded w-100"
        />
      </div>
    </>
  );
}

import React from "react";

export default function Input({
  name,
  value,
  onChange,
  isRequired = false,
  error = "",
  title = "",
  placeholder = "",
}) {
  const formatLabel = (text) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <>
      <div className="mb-3">
        <label htmlFor={name} className="form-label fw-bold">
          {title ? title : formatLabel(name)}

          {isRequired && <sup className="text-danger">*</sup>}
        </label>
        <input
          type="text"
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : formatLabel(name)}
        />
        {error && <div className="text-danger">{error}</div>}
      </div>
    </>
  );
}

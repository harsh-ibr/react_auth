import React from "react";

export default function Textarea({
  name,
  value,
  onChange,
  isRequired = false,
  title = "",
  rows = 8,
  error = "",
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
        <textarea
          type="text"
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={formatLabel(name)}
          rows={rows}
        ></textarea>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </>
  );
}

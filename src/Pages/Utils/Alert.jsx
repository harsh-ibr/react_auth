import React from "react";

export default function Alert({
  type = "success",
  message = "Please check alert message",
}) {
  return (
    <div className={`alert alert-${type} alert-dismissible`} role="alert">
      {message} .
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

import React from "react";

function StatusList({ status }) {
  return (
    <>
      <span
        className={`badge ${
          status === "completed"
            ? "bg-label-success"
            : status === "draft"
              ? "bg-label-secondary"
              : status === "pending"
                ? "bg-label-warning"
                : "bg-label-secondary"
        }  me-1`}
      >
        {status}
      </span>
    </>
  );
}

export default StatusList;

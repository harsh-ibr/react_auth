import React from "react";

export default function Button({ onClick, ButtonText = "Submit" }) {
  return (
    <>
      <button className="btn btn-primary w-100" onClick={onClick}>
        {ButtonText}
      </button>
    </>
  );
}

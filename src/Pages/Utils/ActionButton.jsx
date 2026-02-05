import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

function ActionButton({ id, editUrl, deleteUrl, onDeleteSuccess }) {
  const { handleDelete } = useAxios();
  // onDeleteSuccess(id);

  const manageDelete = async () => {
    handleDelete(deleteUrl, id);
    onDeleteSuccess(id);
  };
  return (
    <>
      {editUrl && (
        <Link
          to={`${editUrl}/${id}`}
          className="btn btn-sm btn-outline-info me-1"
        >
          <i className="bx bx-edit"></i>
        </Link>
      )}

      {deleteUrl && (
        <button
          type="button"
          onClick={() => manageDelete()}
          className="btn btn-sm btn-outline-danger"
        >
          <i className="bx bx-trash"></i>
        </button>
      )}
    </>
  );
}

export default React.memo(ActionButton);

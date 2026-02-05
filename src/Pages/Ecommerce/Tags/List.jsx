import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { AlertContext } from "../../../Context/AlertContext";
import Alert from "../../Utils/Alert";
import Pagination from "../../../components/Pagination";

export default function List() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useContext(AuthContext);
  const { alert, callAlert } = useContext(AlertContext);
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [paginations, setPaginations] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRecords(currentPage);
  }, [refresh, currentPage]);

  const fetchRecords = async (page) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tag`, {
        params: {
          page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(response.data.data);
      setPaginations(response.data.pagination);
    } catch (error) {
      callAlert(true, "danger", error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/tag/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      callAlert(true, "success", response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      callAlert(true, "danger", error.response.data.message);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/tag`, {
        data: { ids: selectedIds },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      callAlert(true, "success", response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      callAlert(true, "danger", error.response.data.message);
    }
  };
  const handleSelectAll = async (e) => {
    if (e.target.checked) {
      setSelectedIds(tags.map((tag) => tag._id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Ecommerce / Tags / List</span>
          </h4>
          {alert?.isShow && (
            <Alert
              isShow={alert.isShow}
              type={alert.type}
              message={alert.message}
            />
          )}
          <div className="card">
            <h5 className="card-header border-bottom">
              Tags List
              <button
                onClick={handleBulkDelete}
                className="btn btn-outline-danger float-end"
              >
                <i className="bx bx-trash"></i>
                &nbsp; Bulk Delete
              </button>
              <Link
                to={`/admin/ecommerce/tag/create`}
                className="btn btn-outline-primary float-end me-2"
              >
                <i className="bx bx-plus"></i> Create
              </Link>
            </h5>

            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr className="text-nowrap">
                    <th>
                      <input
                        type="checkbox"
                        name="allSelect"
                        onChange={handleSelectAll}
                        checked={
                          tags.length > 0 && selectedIds.length === tags.length
                        }
                      />
                    </th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tags && tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            name="_id"
                            checked={selectedIds.includes(tag._id)}
                            onChange={() =>
                              setSelectedIds((prev) =>
                                prev.includes(tag._id)
                                  ? prev.filter((id) => id !== tag._id)
                                  : [...prev, tag._id]
                              )
                            }
                          />
                        </td>
                        <td>{tag.name}</td>
                        <td>
                          {new Date(tag.createdAt).toLocaleDateString("en-CA")}
                        </td>
                        <td>
                          <Link
                            to={`/admin/ecommerce/tag/${tag._id}`}
                            className="btn btn-outline-info btn-sm me-1"
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(tag._id)}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        No data records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="float-end mt-3 m-3">
                <Pagination
                  pagination={paginations}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../Utils/Alert";
import { AuthContext } from "../../Context/AuthContext";
import { AlertContext } from "../../Context/AlertContext";
import Pagination from "../../components/Pagination";

export default function StoreList() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedIds, setSelectedIds] = useState([]);
  const { token } = useContext(AuthContext);
  const { alert, callAlert } = useContext(AlertContext);
  const [stores, setStores] = useState([]);
  const [paginations, setPaginations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchStores(currentPage);
  }, [refresh, currentPage]);

  const fetchStores = async (page) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/store`, {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStores(response.data.data);
      setPaginations(response.data.pagination);
    } catch (error) {
      callAlert(true, "danger", error.response?.data?.error || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/store/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      callAlert(true, "success", response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      callAlert(true, "danger", error.response?.data?.error || error.message);
    }
  };

  const handleBulkDelete = async () => {
    try {
      if (selectedIds.length === 0) {
        alert("Please select at least one item");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/store/bulk-delete`,
        { ids: selectedIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      callAlert(true, "success", response.data.message);
      setRefresh(!refresh);
      setSelectedIds([]);
    } catch (error) {
      callAlert(true, "danger", error.response?.data?.error || error.message);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(stores.map((store) => store._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-label-success";
      case "inactive":
        return "bg-label-danger";
      case "pending":
        return "bg-label-warning";
      default:
        return "bg-label-secondary";
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Store / List</span>
          </h4>
          {alert?.isShow && <Alert type={alert.type} message={alert.message} />}

          <div className="card">
            <h5 className="card-header border-bottom">
              Stores List
              <button
                onClick={handleBulkDelete}
                className="btn btn-outline-danger float-end"
                disabled={selectedIds.length === 0}
              >
                <i className="bx bx-trash"></i>
                &nbsp; Bulk Delete
              </button>
              <Link
                to="/admin/store/create"
                className="btn btn-outline-primary float-end me-2"
              >
                <i className="bx bx-plus"></i> Add Store
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
                          stores.length > 0 &&
                          selectedIds.length === stores.length
                        }
                      />
                    </th>
                    <th>Store Name</th>
                    <th>Store App Id</th>
                    <th>Store Status</th>
                    <th>Create Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stores && stores.length > 0 ? (
                    stores.map((store, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(store._id)}
                            onChange={() => handleRowSelect(store._id)}
                          />
                        </td>
                        <td>
                          <span className="fw-medium">{store.storeName}</span>
                        </td>
                        <td>{store.storeAppId}</td>
                        <td>
                          <span
                            className={`badge ${getStatusBadgeClass(store.storeStatus)}`}
                          >
                            {store.storeStatus}
                          </span>
                        </td>
                        <td>
                          {new Date(store.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Link
                            to={`/admin/store/${store._id}`}
                            className="btn btn-outline-info btn-sm me-2"
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(store._id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="text-muted"
                        colSpan={6}
                        style={{ textAlign: "center" }}
                      >
                        No data available.
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

        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
}

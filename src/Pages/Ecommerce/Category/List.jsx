import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "../../Utils/Alert";
import ImageList from "../../Utils/ImageList";
import { AuthContext } from "../../../Context/AuthContext";
import { AlertContext } from "../../../Context/AlertContext";
import Pagination from "../../../components/Pagination";

export default function List() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedIds, setSelectedIds] = useState([]);
  const { token } = useContext(AuthContext);
  const { alert, callAlert } = useContext(AlertContext);
  const [brands, setBrands] = useState([]);
  const [paginations, setPaginations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getRecords(currentPage);
  }, [refresh, currentPage]);

  const getRecords = async (page) => {
    // handleLoader(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/category`, {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(response.data.data);
      setPaginations(response.data.pagination);
    } catch (error) {
      callAlert(true, "danger", error.response.data.error);
      // console.log("error", error);
    } finally {
      // handleLoader(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      callAlert(true, "success", response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      callAlert(true, "danger", error.response.data.error);
    } finally {
      const timer = setTimeout(() => {
        // handleLoader(false);
      }, 5000); // 👈 5 seconds
      // handleLoader(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      console.log("Auth Toekn", token);
      if (selectedIds.length == 0) {
        alert("Please select at least one item");
        return;
      }

      const result = await axios.post(
        `${API_BASE_URL}/api/category/bulk_delete`,
        { ids: selectedIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRefresh(!refresh);
      callAlert(true, "success", result.data.message);
    } catch (error) {
      callAlert(true, "danger", error.response.data.error);
    }
  };

  const handleSelectAll = async (e) => {
    if (e.target.checked) {
      setSelectedIds(brands.map((brand) => brand._id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">
              Ecommerce / Category / List
            </span>
          </h4>
          {alert?.isShow && <Alert type={alert.type} message={alert.message} />}
          <div className="card">
            <h5 className="card-header border-bottom">
              Category Lists
              <button
                onClick={handleBulkDelete}
                className="btn btn-outline-danger float-end"
              >
                <i className="bx bx-trash"></i>
                &nbsp; Bulk Delete
              </button>
              <Link
                to={`/admin/ecommerce/category/create`}
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
                          brands.length > 0 &&
                          selectedIds.length === brands.length
                        }
                      />
                    </th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brands && brands.length > 0 ? (
                    brands.map((brand, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            name="_id"
                            checked={selectedIds.includes(brand._id)}
                            onChange={() =>
                              setSelectedIds((prev) =>
                                prev.includes(brand._id)
                                  ? prev.filter((id) => id !== brand._id)
                                  : [...prev, brand._id],
                              )
                            }
                          />
                        </td>
                        <td>
                          <ImageList thumbnail={brand?.thumbnail} />
                        </td>
                        <td>{brand.name}</td>
                        <td>
                          {new Date(brand.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Link
                            to={`/admin/ecommerce/category/${brand._id}`}
                            className="btn btn-info btn-sm me-2"
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                          <button
                            onClick={(e) => handleDelete(brand._id)}
                            className="btn btn-danger btn-sm"
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
                        colSpan={5}
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

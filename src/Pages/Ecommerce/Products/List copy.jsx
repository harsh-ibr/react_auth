import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import defaultImage from "@/assets/download.png";
import Alert from "../../Utils/Alert";
import Pagination from "../../../components/Pagination";
import ImageList from "../../Utils/ImageList";

export default function List() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedIds, setSelectedIds] = useState([]);
  const { token } = useContext(AuthContext);
  const [paginations, setPaginations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isAlert, setIsAlert] = useState({
    isShow: false,
    type: "danger",
    message: "Some thing went to wrong",
  });

  useEffect(() => {
    fetchRecords(currentPage);
  }, [refresh, currentPage]);

  const fetchRecords = async (page) => {
    // handleLoader(true);
    try {
      const result = await axios.get(`${API_BASE_URL}/api/product`, {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(result.data.data);
      setPaginations(result.data.pagination);
      // console.log(result);
    } catch (error) {
      setIsAlert({
        isShow: true,
        type: "danger",
        message: error.message,
      });
      console.log("Error", error);
    } finally {
      // handleLoader(false);
    }
  };

  const handleSelectAll = async (e) => {
    if (e.target.checked) {
      setSelectedIds(products.map((product) => product._id));
    } else {
      setSelectedIds([]);
    }

    console.log("Selected All");
  };

  const handleDelete = async (id) => {
    // handleLoader(true);
    try {
      const result = await axios.delete(`${API_BASE_URL}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      setIsAlert({
        isShow: true,
        type: "danger",
        message: error.response.data.message,
      });
    } finally {
      setTimeout(() => {
        // handleLoader(false);
      }, 1000);
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
        `${API_BASE_URL}/api/product/bulk_delete`,
        { ids: selectedIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsAlert({
        isShow: true,
        type: "success",
        message: result.data.message || "Products deleted successfully",
      });
    } catch (error) {
      setIsAlert({
        isShow: true,
        type: "danger",
        message: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">
              Ecommerce / Products / List
            </span>
          </h4>
          {isAlert?.isShow && (
            <Alert type={isAlert.type} message={isAlert.message} />
          )}
          <div className="card">
            <h5 className="card-header border-bottom">
              Products Lists
              <button
                onClick={handleBulkDelete}
                className="btn btn-outline-danger float-end"
              >
                <i className="bx bx-trash"></i>
                &nbsp; Bulk Delete
              </button>
              <Link
                to={`/admin/ecommerce/products/create`}
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
                          products.length > 0 &&
                          selectedIds.length === products.length
                        }
                      />
                    </th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Sub category</th>
                    <th>Tags</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <input
                            type="checkbox"
                            name="_id"
                            checked={selectedIds.includes(product._id)}
                            onChange={() =>
                              setSelectedIds((prev) =>
                                prev.includes(product._id)
                                  ? prev.filter((id) => id !== product._id)
                                  : [...prev, product._id],
                              )
                            }
                          />
                        </th>
                        <td>
                          <ImageList thumbnail={product?.thumbnail} />
                        </td>
                        <td>{product?.name}</td>
                        <td>{product?.brand?.name}</td>
                        <td>{product?.category?.name}</td>
                        <td>{product?.sub_category?.name}</td>
                        <td>
                          {product?.tags?.length > 0 &&
                            product.tags.map((tag, index) => (
                              <span
                                key={tag._id}
                                className="badge bg-label-info me-1"
                              >
                                {tag.name}
                                {/* {index < product.tags.length - 1 ? " " : ""} */}
                              </span>
                            ))}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              product?.status === "completed"
                                ? "bg-label-success"
                                : product?.status === "draft"
                                  ? "bg-label-secondary"
                                  : product?.status === "pending"
                                    ? "bg-label-warning"
                                    : "bg-label-secondary"
                            }  me-1`}
                          >
                            {product?.status}
                          </span>
                        </td>
                        <td>{product?.price}</td>
                        <td>{product.stock_quantity}</td>
                        <td>
                          <Link
                            to={`/admin/ecommerce/products/${product?._id}`}
                            className="btn btn-sm btn-outline-info me-1"
                          >
                            <i className="bx bx-edit"></i>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(product?._id)}
                            className="btn btn-sm btn-outline-danger"
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
                        colSpan={11}
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

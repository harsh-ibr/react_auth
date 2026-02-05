import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import defaultImage from "@/assets/download.png";
import Alert from "../../Utils/Alert";
import Pagination from "../../../components/Pagination";
import ImageList from "../../Utils/ImageList";
import DataTable from "../../Utils/DataTable";
import useAxios from "../../../Hooks/useAxios";

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
  const { data, handleAxios } = useAxios();
  useEffect(() => {
    // const { data, handleAxios } = useAxios();
    handleAxios("product");
    // fetchRecords(currentPage);
  }, [refresh, currentPage]);

  const tableData = {
    headers: [
      {
        column: "Row Checkbox",
        index: "row_checkbox",
      },
      {
        column: "Image",
        index: "thumbnail",
      },
      {
        column: "Name",
        index: "name",
      },

      {
        column: "Brand",
        index: "brand",
      },
      {
        column: "Category",
        index: "category",
      },
      {
        column: "Sub Category",
        index: "sub_category",
      },
      {
        column: "Tags",
        index: "tags",
      },
      {
        column: "Status",
        index: "status",
      },

      {
        column: "Action",
        index: "action",
      },
    ],
    type: "product",
    title: "Product List",
    createUrl: "/admin/ecommerce/products/create",
    editUrl: "/admin/ecommerce/products",
    deleteUrl: "/product/",
    bulkDelete: "product/bulk_delete",
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

          <DataTable table={tableData} />
          {/* <div className="table-responsive text-nowrap">
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
            </div> */}
        </div>

        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
}

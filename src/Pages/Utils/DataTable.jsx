import React, { useContext, useEffect, useState } from "react";
import ImageList from "./ImageList";
import TagsList from "./TagsList";
import StatusList from "./StatusList";
import ActionButton from "./ActionButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import Pagination from "../../components/Pagination";

function DataTable({ table }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const tableTitle = table?.title;
  const tableHeader = table?.headers;
  const createUrl = table?.createUrl;
  const editUrl = table?.editUrl;
  const deleteUrl = table?.deleteUrl;
  const bulkDelete = table?.bulkDelete;
  const type = table?.type;
  const { token } = useContext(AuthContext);
  const { data, pagination, handleTableList, handleBulkDelete } = useAxios();
  const [tableBody, setTableBody] = useState(data);
  const [checkedId, setCheckedId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleTableList(type, currentPage);
  }, [currentPage, type]);

  useEffect(() => {
    setTableBody(data || []);
  }, [data]); // 👈 update when data changes
  const selectedIds = (id) => {
    setCheckedId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleRowDelete = (deletedId) => {
    setTableBody((prev) => prev.filter((row) => row._id !== deletedId));
    setCheckedId((prev) => prev.filter((id) => id !== deletedId));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedId(tableBody.map((row) => row._id));
    } else {
      setCheckedId([]);
    }
  };

  const renderValue = (row, columnName) => {
    const value = row?.[columnName];
    if (columnName === "thumbnail" || columnName === "image") {
      return <ImageList thumbnail={value} />;
    }

    if (columnName === "Row Checkbox" || columnName === "row_checkbox") {
      return (
        <input
          type="checkbox"
          id="_id"
          onChange={() => selectedIds(row._id)}
          value={row._id}
          checked={checkedId.includes(row._id)}
        />
      );
    }

    if (columnName === "action" || columnName === "Action") {
      return (
        <ActionButton
          id={row._id}
          editUrl={editUrl}
          deleteUrl={deleteUrl}
          onDeleteSuccess={handleRowDelete}
        />
      );
    }
    if (value === null || value === undefined) return "";

    if (typeof value === "object" && columnName === "tags") {
      return <TagsList tags={value} />;
    }
    if (typeof value === "object") {
      return value.name ?? value._id ?? " ";
    }

    if (columnName === "status") {
      return <StatusList status={value} />;
    }
    return value;
  };

  // const handleBulkDelete = async () => {
  //   try {
  //     console.log("Auth Toekn", token);
  //     if (checkedId.length == 0) {
  //       alert("Please select at least one item");
  //       return;
  //     }

  //     const result = await axios.post(
  //       `${API_BASE_URL}/api/product/bulk_delete`,
  //       { ids: checkedId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     setTableBody((prev) =>
  //       prev.filter((row) => !checkedId.includes(row._id)),
  //     );
  //     // setIsAlert({
  //     //   isShow: true,
  //     //   type: "success",
  //     //   message: result.data.message || "Products deleted successfully",
  //     // });
  //   } catch (error) {
  //     alert(error.response.data.message);
  //     // console.log("Error", error);
  //     // setIsAlert({
  //     //   isShow: true,
  //     //   type: "danger",
  //     //   message: error.response.data.message,
  //     // });
  //   }
  // };

  return (
    <>
      <div className="card">
        <h5 className="card-header border-bottom">
          {tableTitle && <span> {tableTitle}</span>}
          {bulkDelete && (
            <button
              onClick={() => handleBulkDelete(bulkDelete, checkedId)}
              className="btn btn-outline-danger float-end"
            >
              <i className="bx bx-trash"></i>
              &nbsp; Bulk Delete
            </button>
          )}
          {createUrl && (
            <Link
              to={createUrl}
              className="btn btn-outline-primary float-end me-2"
            >
              <i className="bx bx-plus"></i> Create
            </Link>
          )}
        </h5>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr className="text-nowrap">
                {tableHeader && tableHeader.length > 0
                  ? tableHeader.map((column, index) => {
                      if (column.column == "Row Checkbox") {
                        return (
                          <th key={index}>
                            <input
                              type="checkbox"
                              checked={
                                tableBody.length > 0 &&
                                tableBody.length === checkedId.length
                              }
                              onChange={handleSelectAll}
                            />
                          </th>
                        );
                      } else {
                        return <th key={index}>{column.column}</th>;
                      }
                    })
                  : null}
              </tr>
            </thead>
            <tbody>
              {tableBody && tableBody.length > 0 ? (
                tableBody.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {tableHeader && tableHeader.length > 0
                      ? tableHeader.map((column, colIndex) => {
                          const columnName = column.index; // e.g. "name", "sku"
                          return (
                            <td key={colIndex}>
                              {renderValue(row, columnName)}
                            </td>
                          );
                        })
                      : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-muted"
                    style={{ textAlign: "center" }}
                    colSpan={tableHeader?.length || 1}
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="float-end mt-3 m-3">
            <Pagination
              pagination={pagination}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DataTable;

import React, { useEffect, useEffectEvent } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import Table from "../../Utils/Table";

function List() {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Status", accessor: "status" },
    {
      header: "Featured",
      render: (row) => (row.is_featured ? "Yes" : "No"),
    },
    {
      header: "Image",
      render: (row) => <img src={row.image} width="60" />,
    },
    {
      header: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];
  const { data, handleAxios } = useAxios();
  useEffect(() => {
    handleAxios("post");
  }, []);

  //handleAxios();
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Ecommerce / Brands / List</span>
        </h4>
        <div className="card">
          <h5 className="card-header border-bottom">
            Brand Lists
            <button
              // onClick={handleBulkDelete}
              className="btn btn-outline-danger float-end"
            >
              <i className="bx bx-trash"></i>
              &nbsp; Bulk Delete
            </button>
            <Link
              to={`/admin/ecommerce/brand/create`}
              className="btn btn-outline-primary float-end me-2"
            >
              <i className="bx bx-plus"></i> Create
            </Link>
          </h5>
          <Table columns={columns} data={data} />
          {/* <div className="table-responsive text-nowrap"> */}
          {/* <table className="table">
              <thead>
                <tr className="text-nowrap">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      // onChange={handleSelectAll}
                      // checked={
                      //   brands.length > 0 &&
                      //   selectedIds.length === brands.length
                      // }
                    />
                  </th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table> */}
          {/* <div className="float-end mt-3 m-3"> */}
          {/* <Pagination
                      pagination={paginations}
                      onPageChange={(p) => setCurrentPage(p)}
                    /> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>

      <div className="content-backdrop fade"></div>
    </div>
  );
}

export default List;

import React from "react";
import DataTable from "../../Utils/DataTable";

function List() {
  const tableData = {
    headers: [
      {
        column: "Row Checkbox",
        index: "row_checkbox",
      },
      {
        column: "sku",
        index: "sku",
      },
      {
        column: "Cost",
        index: "cost",
      },

      {
        column: "In Stock",
        index: "in_stock",
      },
      {
        column: "Qty",
        index: "in_stock",
      },
      {
        column: "Date",
        index: "createdAt",
      },
      {
        column: "Action",
        index: "action",
      },
    ],
    type: "ebay-products",
    title: "Product List",
    createUrl: "/admin/ecommerce/ebay/create",
    editUrl: "/admin/ecommerce/ebay/edit/",
    deleteUrl: "/ebay-products/",
    // bulkDelete: "product/bulk_delete",
  };
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Ecommerce / Ebay / List</span>
        </h4>
      </div>
      {<DataTable table={tableData} />}
      <div className="content-backdrop fade"></div>
    </div>
  );
}

export default List;

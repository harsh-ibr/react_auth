import { Route } from "react-router-dom";
import List from "../Pages/Ecommerce/Ebay/List";
import Create from "../Pages/Ecommerce/Ebay/Create";
import Edit from "../Pages/Ecommerce/Ebay/Edit";
import ProtectedRoute from "../ProtectedRoute";

const EbayRoutes = [
  <Route
    key="ebay-list"
    path="ecommerce/ebay"
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ebay-create"
    path="ecommerce/ebay/create"
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ebay-edit"
    path="ecommerce/ebay/edit/:id"
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default EbayRoutes;

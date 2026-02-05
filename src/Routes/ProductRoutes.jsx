import { Route } from "react-router-dom";
import List from "../Pages/Ecommerce/Products/List.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import Create from "../Pages/Ecommerce/Products/Create.jsx";
import Edit from "../Pages/Ecommerce/Products/Edit.jsx";

const ProductRoutes = [
  <Route
    key="product-list"
    path="ecommerce/products"
    exact
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="product-create"
    path="ecommerce/products/create"
    exact
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="product-edit"
    path="ecommerce/products/:id"
    exact
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default ProductRoutes;

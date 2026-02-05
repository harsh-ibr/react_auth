import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import List from "../Pages/Ecommerce/SubCategory/List";
import Create from "../Pages/Ecommerce/SubCategory/Create";
import Edit from "../Pages/Ecommerce/SubCategory/Edit";

const SubCategoryRoute = [
  <Route
    key="subcategory-list"
    path="ecommerce/sub-category"
    exact
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="subcategory-create"
    path="ecommerce/sub-category/create"
    exact
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="subcategory-edit"
    path="ecommerce/sub-category/:id"
    exact
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default SubCategoryRoute;

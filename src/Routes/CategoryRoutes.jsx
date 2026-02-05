import React from "react";
import { Route } from "react-router-dom";
import Create from "../Pages/Ecommerce/category/Create";
import Edit from "../Pages/Ecommerce/category/Edit";
import List from "../Pages/Ecommerce/category/List";
import ProtectedRoute from "../ProtectedRoute";

const CategoryRoutes = [
  <Route
    key="category-list"
    path="ecommerce/category"
    exact
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="category-create"
    path="ecommerce/category/create"
    exact
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="category-edit"
    path="ecommerce/category/:id"
    exact
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default CategoryRoutes;

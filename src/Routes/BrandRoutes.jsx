import React from "react";
import { Route } from "react-router-dom";
import Create from "../Pages/Ecommerce/Brands/Create";
import Edit from "../Pages/Ecommerce/Brands/Edit";
import List from "../Pages/Ecommerce/Brands/List";
import ProtectedRoute from "../ProtectedRoute";

const BrandRoutes = [
  <Route
    key="brand-list"
    path="ecommerce/brands"
    exact
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="brand-create"
    path="ecommerce/brand/create"
    exact
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="brand-edit"
    path="ecommerce/brand/:id"
    exact
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default BrandRoutes;

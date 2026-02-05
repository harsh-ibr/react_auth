import { Route } from "react-router-dom";
import List from "../Pages/Store/List";
import Create from "../Pages/Store/Create";
import Edit from "../Pages/Store/Edit";
import ProtectedRoute from "../ProtectedRoute";

const StoreRoutes = [
  <Route
    key="store-list"
    path="store"
    exact
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="store-create"
    path="store/create"
    exact
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="store-edit"
    path="store/:id"
    exact
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default StoreRoutes;

import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import List from "../Pages/Ecommerce/Tags/List.jsx";
import Create from "../Pages/Ecommerce/Tags/Create.jsx";
import Edit from "../Pages/Ecommerce/Tags/Edit.jsx";

const TagRoutes = [
  <Route
    key="tag-list"
    path="ecommerce/tags"
    exact
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
  <Route
    key="tag-create"
    path="ecommerce/tag/create"
    exact
    element={
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    }
  />,
  <Route
    key="tag-edit"
    path="ecommerce/tag/:id"
    exact
    element={
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    }
  />,
];

export default TagRoutes;

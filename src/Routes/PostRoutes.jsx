import { Route } from "react-router-dom";
import List from "./../Pages/Blogs/Posts/List";
import ProtectedRoute from "../ProtectedRoute";

const PostRoutes = [
  <Route
    key="post-list"
    exact
    path="blog/posts"
    element={
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    }
  />,
];

export default PostRoutes;

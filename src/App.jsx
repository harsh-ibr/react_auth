import { useState } from "react";

import Layout from "./components/Layout";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { AuthProvider } from "./Context/AuthContext";
import { AlertProvide } from "./Context/AlertContext";
import ProtectedRoute from "./ProtectedRoute";
import ProductRoutes from "./Routes/ProductRoutes";
import BrandRoutes from "./Routes/BrandRoutes";
import CategoryRoutes from "./Routes/CategoryRoutes";
import SubCategoryRoute from "./Routes/SubCategoryRoute";
import TagRoutes from "./Routes/TagRoutes";
import StoreRoutes from "./Routes/StoreRoutes";
import PostRoutes from "./Routes/PostRoutes";
import EbayRoutes from "./Routes/EbayRoutes";
function App() {
  return (
    <>
      <AuthProvider>
        <AlertProvide>
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<Layout />}>
                <Route
                  path="dashboard"
                  exact
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                {ProductRoutes}
                {BrandRoutes}
                {CategoryRoutes}
                {SubCategoryRoute}
                {TagRoutes}
                {StoreRoutes}
                {PostRoutes}
                {EbayRoutes}
              </Route>

              <Route path="/login" exact element={<Login />}></Route>
              <Route path="/" exact element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </AlertProvide>
      </AuthProvider>
    </>
  );
}

export default App;

import React, { useContext, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Navbar from "./Navbar";
import PageLoader from "./PageLoader";
import { AuthContext } from "../Context/AuthContext";

const Layout = React.memo(() => {
  const { isLoader } = useContext(AuthContext);
  return (
    <>
      <PageLoader show={isLoader} />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Aside />
          <div className="layout-page">
            <Navbar />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Outlet />
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
});

export default Layout;

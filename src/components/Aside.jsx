import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/vite.svg";

// export default function Aside()
const Aside = React.memo(() => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState({
    layouts: false,
    ecommerce: false,
    blog: false,
  });

  const toggleMenu = useCallback((menuName) => {
    setIsOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName], // toggle only this menu
    }));
  }, []);
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <Link to="#" className="app-brand-link">
            <span className="app-brand-text demo menu-text fw-bolder ms-2">
              <img src={Logo} /> Sneat
            </span>
          </Link>

          <Link
            to="#"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </Link>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li
            className={`menu-item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <Link to="/admin/dashboard" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </Link>
          </li>

          <li
            className={`menu-item ${
              location.pathname.startsWith("/admin/store") ? "active" : ""
            }`}
          >
            <Link to="/admin/store" className="menu-link">
              <i className="menu-icon tf-icons bx bx-store"></i>
              <div data-i18n="Store">Store</div>
            </Link>
          </li>

          <li
            className={`menu-item ${
              isOpen.ecommerce ||
              location.pathname.startsWith("/admin/ecommerce")
                ? "open active"
                : ""
            } `}
          >
            <a
              href="#"
              className="menu-link menu-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu("ecommerce"); // toggle class
              }}
            >
              <i className="menu-icon tf-icons bx bx-shopping-bag"></i>
              <div className="text-truncate" data-i18n="Ecommerce">
                Ecommerce
              </div>
            </a>

            <ul className="menu-sub">
              <li
                className={`menu-item ${
                  location.pathname.includes("/products") ? "active" : ""
                }`}
              >
                <Link to="ecommerce/products" className={`menu-link`}>
                  <div className="text-truncate">Products</div>
                </Link>
              </li>

              <li
                className={`menu-item ${
                  location.pathname.includes("/brand") ? "active" : ""
                }`}
              >
                <Link to="ecommerce/brands" className={`menu-link `}>
                  <div className="text-truncate">Brands</div>
                </Link>
              </li>

              <li
                className={`menu-item ${
                  location.pathname.includes("/category") ? "active" : ""
                }`}
              >
                <Link to="ecommerce/category" className="menu-link">
                  <div className="text-truncate">Category</div>
                </Link>
              </li>
              <li
                className={`menu-item ${
                  location.pathname.includes("/sub-category") ? "active" : ""
                }`}
              >
                <Link to="ecommerce/sub-category" className="menu-link">
                  <div className="text-truncate">Sub Category</div>
                </Link>
              </li>
              <li
                className={`menu-item ${
                  location.pathname.includes("/tag") ? "active" : ""
                }`}
              >
                <Link to="ecommerce/tags" className="menu-link">
                  <div className="text-truncate">Tags</div>
                </Link>
              </li>
              <li
                className={`menu-item ${
                  location.pathname.includes("/ebay") ? "active" : ""
                }`}
              >
                <Link to="ecommerce/ebay" className="menu-link">
                  <div className="text-truncate">Ebay Products</div>
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={`menu-item ${
              isOpen.blog || location.pathname.startsWith("/admin/blog")
                ? "open active"
                : ""
            } `}
          >
            <a
              href="#"
              className="menu-link menu-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu("blog"); // toggle class
              }}
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div className="text-truncate" data-i18n="blog">
                Blog
              </div>
            </a>

            <ul className="menu-sub">
              <li
                className={`menu-item ${
                  location.pathname.includes("/blog/posts") ? "active" : ""
                }`}
              >
                <Link to="blog/posts" className="menu-link">
                  <div className="text-truncate" data-i18n="Posts">
                    Posts
                  </div>
                </Link>
              </li>

              <li
                className={`menu-item ${
                  location.pathname.includes("/blog/categories") ? "active" : ""
                }`}
              >
                <Link to="/blog/categories" className="menu-link">
                  <div className="text-truncate" data-i18n="Categories">
                    Categories
                  </div>
                </Link>
              </li>
              <li
                className={`menu-item ${
                  location.pathname.includes("/blog/authors") ? "active" : ""
                }`}
              >
                <Link to="/blog/authors" className="menu-link">
                  <div className="text-truncate" data-i18n="Authors">
                    Authors
                  </div>
                </Link>
              </li>
            </ul>
          </li>

          <li className={`menu-item ${isOpen.layouts ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu("layouts"); // toggle class
              }}
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div className="text-truncate" data-i18n="Layouts">
                Layouts
              </div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <Link to="/layouts/without-menu" className="menu-link">
                  <div className="text-truncate">Without menu</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/layouts/without-navbar" className="menu-link">
                  <div className="text-truncate">Without navbar</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/layouts/fluid" className="menu-link">
                  <div className="text-truncate">Fluid</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/layouts/container" className="menu-link">
                  <div className="text-truncate">Container</div>
                </Link>
              </li>

              <li className="menu-item">
                <Link to="/layouts/blank" className="menu-link">
                  <div className="text-truncate">Blank</div>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
});

export default Aside;

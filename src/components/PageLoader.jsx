import React from "react";
import Logo from "@/assets/vite.svg";

const PageLoader = React.memo(({ show }) => {
  if (!show) return null;

  return (
    <div id="page-loader" className={show ? "show" : "hide"}>
      <div className="loader-wrapper">
        <div className="loader-ring"></div>
        <img src={Logo} alt="Sneet Logo" className="loader-logo" />
      </div>
    </div>
  );
});

export default PageLoader;

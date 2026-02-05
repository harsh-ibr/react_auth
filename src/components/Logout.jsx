import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Logout = React.memo(() => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);
  return (
    <>
      <button onClick={handleLogout} className="dropdown-item">
        <i className="bx bx-power-off me-2"></i>
        <span className="align-middle">Log Out</span>
      </button>
    </>
  );
});

export default Logout;

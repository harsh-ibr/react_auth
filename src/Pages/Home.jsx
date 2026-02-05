import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Memo from "./Memo";

const Home = () => {
  const { token, logout } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    logout(); // remove token from context + localStorage
    navigate("/"); // redirect to login
  };

  return (
    <div>
      {/* ---------- NAVBAR ---------- */}

      {/* ---------- CONTENT ---------- */}
      <h1 style={{ marginTop: "40px", textAlign: "Left" }}>
        Welcome to dashboard.
      </h1>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        Count - {count}
      </button>
      <Memo />
    </div>
  );
};

export default Home;

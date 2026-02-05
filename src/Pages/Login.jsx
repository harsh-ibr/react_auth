import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;

      login(token);

      navigate("/admin/dashboard", { replace: true });

      console.log("response", response);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  return (
    <>
      <div className={styles.loginPage}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 col-12">
              <div className="card login-card p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold">Welcome Back</h3>
                  <p className="text-muted">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3 position-relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control ps-5"
                      id="email"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email">Email address</label>
                    <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  </div>

                  <div className="form-floating mb-3 position-relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control ps-5"
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                    <i className="bi bi-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-decoration-none">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary login-btn text-white w-100 py-2"
                  >
                    Login
                  </button>

                  <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account?</span>
                    <a href="#" className="text-decoration-none fw-semibold">
                      Sign up
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

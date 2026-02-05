import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { AlertContext } from "../../Context/AlertContext";
import Alert from "../Utils/Alert";
import Input from "../Utils/Input";
import Button from "../Utils/Button";

export default function CreateStore() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { alert, callAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    storeDevId: "",
    storeAppId: "",
    storeCertId: "",
    storeSiteId: "",
    storeStatus: "Active",
    storeToken: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/store`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      callAlert(true, "success", response.data.message);
      navigate("/admin/store");
    //   setTimeout(() => {
    //   }, 1500);
    } catch (error) {
      callAlert(true, "danger", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Store /</span>
            <span> Create</span>
          </h4>

          {alert?.isShow && <Alert type={alert.type} message={alert.message} />}

          <div className="row">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Add Store</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Input
                          type="text"
                          label="Store Name"
                          name="storeName"
                          value={formData.storeName}
                          onChange={handleInputChange}
                          placeholder="Enter store name"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <Input
                          type="text"
                          label="Store Dev Id"
                          name="storeDevId"
                          value={formData.storeDevId}
                          onChange={handleInputChange}
                          placeholder="Enter store dev id"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Input
                          type="text"
                          label="Store App Id"
                          name="storeAppId"
                          value={formData.storeAppId}
                          onChange={handleInputChange}
                          placeholder="Enter store app id"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <Input
                          type="text"
                          label="Store Cert Id"
                          name="storeCertId"
                          value={formData.storeCertId}
                          onChange={handleInputChange}
                          placeholder="Enter store cert id"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Input
                          type="text"
                          label="Store Site Id"
                          name="storeSiteId"
                          value={formData.storeSiteId}
                          onChange={handleInputChange}
                          placeholder="Enter store site id"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Store Status</label>
                        <select
                          name="storeStatus"
                          value={formData.storeStatus}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="Active">Active</option>
                          <option value="Deactive">Deactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Store Token</label>
                      <textarea
                        name="storeToken"
                        value={formData.storeToken}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter store token"
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="d-flex justify-content-between">
                      <Button
                        type="submit"
                        text={isLoading ? "Creating..." : "Create Store"}
                        className="btn btn-primary"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => navigate("/admin/store")}
                        className="btn btn-outline-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
}

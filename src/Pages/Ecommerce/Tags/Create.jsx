import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Utils/Input";
import Button from "../../Utils/Button";
import axios from "axios";
import { AlertContext } from "../../../Context/AlertContext";
import Alert from "../../Utils/Alert";

export default function Create() {
  const navigate = useNavigate();
  const { alert, callAlert } = useContext(AlertContext);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formError, setFormError] = useState();
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/tag`, formData, {
        headers: {
          Authorization: `Bearer dgfjh`,
        },
      });

      callAlert(true, "success", response.data.message);
      navigate("/admin/ecommerce/tags");
    } catch (error) {
      if (error.status == 400) {
        const errors = error.response.data.errors;
        errors.map((err, index) => {
          const field = err.field;
          const message = err.message;
          setFormError((prev) => ({
            ...prev,
            [field]: message,
          }));
        });
      } else {
        callAlert(true, "danger", error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Ecommerce /</span>
            <Link to={`/admin/ecommerce/tags`}> Tags</Link>
            <span className="text-muted fw-light"> / Add </span>
          </h4>

          {alert?.isShow && <Alert type={alert.type} message={alert.message} />}
          <div className="row">
            <div className="col-md-9">
              <div className="card mb-4">
                <h5 className="card-header">Add Tag</h5>
                <div className="card-body">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    isRequired={true}
                    error={formError?.name}
                  />
                  <Button onClick={handleSubmit} ButtonText="Submit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

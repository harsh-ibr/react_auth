import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../Utils/Input";
import Textarea from "../../Utils/Textarea";
import ImageFieldPreviou from "../../Utils/ImageFieldPreviou";
import Button from "../../Utils/Button";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import Alert from "../../Utils/Alert";
import { AlertContext } from "../../../Context/AlertContext";

export default function Edit() {
  const { id } = useParams();
  useEffect(() => {
    getBrandById(id);
  }, [id]);
  const { token } = useContext(AuthContext);
  const { callAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [errForm, setErrForm] = useState();
  const [isAlert, setIsAlert] = useState({
    isShow: false,
    type: "danger",
    message: "Some thing went to wrong",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getBrandById = async (id) => {
    setIsAlert({
      isShow: false,
      type: "danger",
      message: "",
    });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        name: response.data.data.name,
        description: response.data.data.description,
        image: response.data.data.image,
      });
    } catch (error) {
      // callAlert(true, "danger", error.response.data.error);
      setIsAlert({
        isShow: true,
        type: "danger",
        message: error.message,
      });
    } finally {
    }
  };

  const handleSubmit = async () => {
    setErrForm("");
    setIsAlert((prev) => {
      return {
        ...prev,
        isShow: false,
      };
    });
    try {
      const form = Object.entries(formData).reduce(
        (fd, [k, v]) => (v && fd.append(k, v), fd),
        new FormData()
      );
      const response = await axios.put(
        `${API_BASE_URL}/api/category/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      callAlert(true, "success", response.data.message);
      navigate("/admin/ecommerce/category");
    } catch (error) {
      if (error.status === 400) {
        const fieldsError = error.response.data.errors;
        fieldsError.map((eRow, index) => {
          const fieldName = eRow.field;
          const fieldValue = eRow.message;
          setErrForm((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
          }));
        });
      } else {
        setIsAlert({
          isShow: true,
          type: "danger",
          message: error.response.data.message,
        });
      }
    }
  };
  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Ecommerce /</span>
            <Link to={`/admin/ecommerce/category`}> Category</Link>
            <span className="text-muted fw-light"> / Edit </span>
          </h4>
          {isAlert?.isShow && (
            <Alert type={isAlert.type} message={isAlert.message} />
          )}
          <div className="row">
            <div className="col-md-9">
              <div className="card mb-4">
                <h5 className="card-header">Edit Category</h5>
                <div className="card-body">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isRequired={true}
                    error={errForm?.name}
                  />
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Button onClick={handleSubmit} />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card mb-4">
                <h5 className="card-header">Image</h5>
                <div className="card-body">
                  <ImageFieldPreviou
                    image={formData.image}
                    onChange={(file) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: file,
                      }))
                    }
                  />
                </div>
                <hr className="m-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

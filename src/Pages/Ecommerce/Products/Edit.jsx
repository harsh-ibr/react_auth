import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import ImageFieldPreviou from "../../Utils/ImageFieldPreviou";
import TagsInput from "../../Utils/TagsInput";

export default function Edit() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    tags: [],
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errForm, setErrForm] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    productById(id);
    getAllBrands();
    getAllCategory();
    getAllSubCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getAllBrands = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/brand/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBrands(response.data.data);
    } catch (error) {}
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/category/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data);
    } catch (error) {}
  };

  const getAllSubCategory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/sub-category/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSubCategories(response.data.data);
    } catch (error) {}
  };

  const productById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setFormData(response.data.data);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = Object.entries(formData).reduce((fd, [key, value]) => {
        if (!value) return fd;
        if (key === "tags" && Array.isArray(value)) {
          value.forEach((tagId) => {
            fd.append("tags[]", tagId);
          });
        } else {
          fd.append(key, value);
        }

        return fd;
      }, new FormData());
      await axios.put(`${API_BASE_URL}/api/product/${formData._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/ecommerce/products");
      // console.log("response", response);
    } catch (error) {
      if (error.status === 400) {
        const fieldsError = error.response.data.errors;
        fieldsError.map((eRow, index) => {
          const fieldName = eRow.field;
          const fieldValue = eRow.message;
          console.log(fieldName, fieldValue);
          setErrForm((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
          }));
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
            <Link to={`/admin/ecommerce/products`}> Products</Link>
            <span className="text-muted fw-light"> / Edit </span>
          </h4>

          <div className="row">
            <div className="col-md-9">
              <div className="card mb-4">
                <h5 className="card-header">Edit Product</h5>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      Name
                      <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter products name"
                    />
                    {errForm?.name && (
                      <div className="text-danger">{errForm.name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="short_description"
                      className="form-label fw-bold"
                    >
                      Short Description
                      <sup className="text-danger">*</sup>
                    </label>
                    <textarea
                      name="short_description"
                      className="form-control"
                      id="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      rows={4}
                    ></textarea>
                    {errForm?.short_description && (
                      <div className="text-danger">
                        {errForm.short_description}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">
                      Description <sup className="text-danger">*</sup>
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={8}
                    ></textarea>
                    {errForm?.description && (
                      <div className="text-danger">{errForm.description}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="brand" className="form-label fw-bold">
                      Brand <sup className="text-danger">*</sup>
                    </label>
                    <select
                      className="form-select"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                    >
                      <option value="">Select Brand</option>
                      {brands &&
                        brands.length > 0 &&
                        brands.map((brand, index) => (
                          <option key={index} value={brand._id}>
                            {brand.name}
                          </option>
                        ))}
                    </select>

                    {/* <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                    /> */}
                    {errForm?.brand && (
                      <div className="text-danger">{errForm.brand}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label fw-bold">
                      Category <sup className="text-danger">*</sup>
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter category name"
                    >
                      <option value="">Select Category</option>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category, index) => (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                    {/* <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter category name"
                    /> */}
                    {errForm?.category && (
                      <div className="text-danger">{errForm.category}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="sub_category"
                      className="form-label fw-bold"
                    >
                      Sub Category <sup className="text-danger">*</sup>
                    </label>
                    <select
                      className="form-select"
                      id="sub_category"
                      name="sub_category"
                      value={formData.sub_category}
                      onChange={handleChange}
                      placeholder="Enter category name"
                    >
                      <option value="">Select Sub Category</option>
                      {subCategories &&
                        subCategories.length > 0 &&
                        subCategories.map((subCategory, index) => (
                          <option key={index} value={subCategory._id}>
                            {subCategory.name}
                          </option>
                        ))}
                    </select>

                    {/* <input
                      type="text"
                      className="form-control"
                      id="sub_category"
                      name="sub_category"
                      value={formData.sub_category}
                      onChange={handleChange}
                      placeholder="Enter sub category name"
                    /> */}
                    {errForm?.sub_category && (
                      <div className="text-danger">{errForm.sub_category}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label fw-bold">
                      Tags <sup className="text-danger">*</sup>
                    </label>
                    <TagsInput
                      value={formData.tags}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          tags: Array.isArray(value)
                            ? value
                            : value.split(",").map((id) => id.trim()),
                        }))
                      }
                    />

                    {/* <input
                      type="text"
                      className="form-control"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="Tags"
                    /> */}
                    {errForm?.tags && (
                      <div className="text-danger">{errForm.tags}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label fw-bold">
                      Status <sup className="text-danger">*</sup>
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      aria-label="Default select example"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="completed">Completed</option>
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                    </select>
                    {errForm?.status && (
                      <div className="text-danger">{errForm.status}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-bold">
                      Price <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="Price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                    {errForm?.price && (
                      <div className="text-danger">{errForm.price}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="stock_quantity"
                      className="form-label fw-bold"
                    >
                      Stock Quantity <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="stock_quantity"
                      placeholder="Stock Quantity"
                      name="stock_quantity"
                      value={formData.stock_quantity}
                      onChange={handleChange}
                    />
                    {errForm?.stock_quantity && (
                      <div className="text-danger">
                        {errForm.stock_quantity}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card mb-4">
                <h5 className="card-header">Image</h5>
                <div className="card-body">
                  <ImageFieldPreviou
                    image={formData?.image}
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

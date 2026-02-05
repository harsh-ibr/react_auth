import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import Input from "../../Utils/Input";
import TagsInput from "../../Utils/TagsInput";
import ImageFieldPreviou from "../../Utils/ImageFieldPreviou";
import Textarea from "../../Utils/Textarea";

export default function Create() {
  const { token } = useContext(AuthContext);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    status: "completed",
    tags: [],
  });

  const [selected, setSelected] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errForm, setErrForm] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getAllBrands();
    getAllCategory();
    getAllSubCategory();
  }, []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrForm("");
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

      console.log("Form Data", formData);
      await axios.post(`${API_BASE_URL}/api/ebay-products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/ecommerce/ebay");
      // console.log("response", response);
    } catch (error) {
      if (error.status === 400) {
        const fieldsError = error.response.data.errors;
        fieldsError.map((eRow, index) => {
          const fieldName = eRow.field;
          const fieldValue = eRow.message;
          // console.log(fieldName, fieldValue);
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
            <span className="text-muted fw-light"> / Add </span>
          </h4>

          <div className="row">
            <div className="col-md-9">
              <div className="card mb-4">
                <h5 className="card-header">Add Product</h5>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.sku}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.cost}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="in_stock"
                        value={formData.in_stock}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.in_stock}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <Input
                        name="sku_without_dash"
                        value={formData.sku_without_dash}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.sku_without_dash}
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <Input
                        name="sku_without_dah"
                        value={formData.sku_without_dah}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.sku_without_dah}
                      /> */}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="full_height_inches"
                        value={formData.full_height_inches}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.full_height_inches}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="full_width_inches"
                        value={formData.full_width_inches}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.full_width_inches}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="full_depth_inches"
                        value={formData.full_depth_inches}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.full_depth_inches}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="full_height_cm"
                        value={formData.full_height_cm}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.full_height_cm}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="full_width_cm"
                        value={formData.full_width_cm}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.full_width_cm}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="full_depth_cm"
                        value={formData.full_depth_cm}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.full_depth_cm}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <Input
                        name="weight_lbs"
                        value={formData.weight_lbs}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.weight_lbs}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        name="weight_kg"
                        value={formData.weight_kg}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.weight_kg}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="color_name"
                        value={formData.color_name}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.color_name}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="material_type"
                        value={formData.material_type}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.material_type}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="mounting_type"
                        value={formData.mounting_type}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.mounting_type}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="recommended_uses_for_product"
                        value={formData.recommended_uses_for_product}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.recommended_uses_for_product}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="style_name"
                        value={formData.style_name}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.style_name}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.theme}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="video_id"
                        value={formData.video_id}
                        onChange={handleChange}
                        error={errForm?.video_id}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label fw-bold">
                        Video Type
                      </label>
                      <select
                        className="form-select"
                        id="video_type"
                        name="video_type"
                        value={formData.video_type}
                        onChange={handleChange}
                      >
                        <option value="_is_bunny">Bunny</option>
                        <option value="_is_youtube">Youtube</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="youtube_id"
                        value={formData.youtube_id}
                        onChange={handleChange}
                        error={errForm?.youtube_id}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
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
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        error={errForm?.type}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        error={errForm?.material}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        error={errForm?.format}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="production_technique"
                        value={formData.production_technique}
                        onChange={handleChange}
                        error={errForm?.production_technique}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="region_of_origin"
                        value={formData.region_of_origin}
                        onChange={handleChange}
                        error={errForm?.region_of_origin}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="original_license"
                        value={formData.original_license}
                        onChange={handleChange}
                        error={errForm?.original_license}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label fw-bold">
                        Handmade
                      </label>
                      <select
                        className="form-select"
                        id="handmade"
                        name="handmade"
                        value={formData.handmade}
                        onChange={handleChange}
                      >
                        <option value="_is_bunny">No</option>
                        <option value="_is_youtube">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label fw-bold">
                        Signed 11
                      </label>
                      <select
                        className="form-select"
                        id="signed"
                        name="signed"
                        value={formData.signed}
                        onChange={handleChange}
                      >
                        <option value="_is_bunny">No</option>
                        <option value="_is_youtube">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <Input
                        name="auction_low"
                        value={formData.auction_low}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.auction_low}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        name="auction_high"
                        value={formData.auction_high}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.auction_high}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="price_low"
                        value={formData.price_low}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.price_low}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="price_high"
                        value={formData.price_high}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.price_high}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="price_mid"
                        value={formData.price_mid}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.price_mid}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label fw-bold">
                        Ebay Subject
                      </label>
                      <select
                        className="form-select"
                        id="ebay_subject"
                        name="ebay_subject"
                        value={formData.ebay_subject}
                        onChange={handleChange}
                      >
                        <option value="Abstract">Abstract</option>
                        <option value="Animals">Animals</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label fw-bold">
                        Largest Dimension
                      </label>
                      <select
                        className="form-select"
                        id="largest_dimension"
                        name="largest_dimension"
                        value={formData.largest_dimension}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="2ft.-5ft.">2ft.-5ft.</option>
                        <option value="12in.-24in.">12in.-24in.</option>
                        <option value="Larger than 5ft.">
                          larger_than_5ft.
                        </option>
                        <option value="Less than 12in.">less_than_12in.</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name" className="form-label fw-bold">
                        Original Reproduction
                      </label>
                      <select
                        className="form-select"
                        id="original_reproduction"
                        name="original_reproduction"
                        value={formData.original_reproduction}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Reproduction">Reproduction</option>
                        <option value="Original">Original</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <Input
                        name="shipping_domestic"
                        value={formData.shipping_domestic}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.shipping_domestic}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="shipping_canada"
                        value={formData.shipping_canada}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.shipping_canada}
                      />
                    </div>
                    <div className="col-md-4">
                      <Input
                        name="shipping_international"
                        value={formData.shipping_international}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.shipping_international}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 1 (T.BRONZE)"
                        placeholder="Title 1 (T.BRONZE)"
                        name="title1"
                        value={formData.title1}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title1}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 2  (BRONZE DEAL)"
                        placeholder="Title 2 (BRONZE DEAL)"
                        name="title2"
                        value={formData.title2}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title2}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 3 ($79)"
                        placeholder="Title 3 ($79)"
                        name="title3"
                        value={formData.title3}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title3}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 4 ($99)"
                        placeholder="Title 4 ($99)"
                        name="title4"
                        value={formData.title4}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title4}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 5 (EUR BRONZE)"
                        placeholder="Title 5 (EUR BRONZE)"
                        name="title5"
                        value={formData.title1}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title1}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 6 (GODDE/DESIG/ART DECO)"
                        placeholder="Title 6 (GODDE/DESIG/ART DECO)"
                        name="title6"
                        value={formData.title6}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title6}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title7 (FINERY)"
                        placeholder="Title7 (FINERY)"
                        name="title7"
                        value={formData.title7}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title7}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 8 (B.VAULT/MANIA)"
                        placeholder="Title 8 (B.VAULT/MANIA)"
                        name="title8"
                        value={formData.title8}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title8}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 9 (EXOTIC)"
                        placeholder="Title 9 (EXOTIC)"
                        name="title9"
                        value={formData.title9}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title9}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 10 (BRLNCE/DECORAT)"
                        placeholder="Title 10 (BRLNCE/DECORAT)"
                        name="title10"
                        value={formData.title10}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title10}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <Input
                        title="Title 11 (CORNER/CLASSY)"
                        placeholder="Title 11 (CORNER/CLASSY)"
                        name="title11"
                        value={formData.title11}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.title11}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <Textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.details}
                      />
                    </div>
                    <div className="col-md-6">
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.description}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <Textarea
                        name="bunny_iframe_code"
                        value={formData.bunny_iframe_code}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.bunny_iframe_code}
                        title="Bunny Video (Frame Code)"
                      />
                    </div>
                    <div className="col-md-6">
                      <Textarea
                        name="youtube_iframe_code"
                        value={formData.youtube_iframe_code}
                        onChange={handleChange}
                        isRequired={true}
                        error={errForm?.youtube_iframe_code}
                        title="Youtube Video (Frame Code)"
                      />
                    </div>
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

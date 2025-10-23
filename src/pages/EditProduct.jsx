
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, fetchProducts } from "../Slices/productsSlice";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );


  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  if (!product) {
    return <p className="text-center my-5">Product not found.</p>;
  }


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const validate = () => {
    const errors = {};
    if (!form.title) errors.title = "Title is required";
    if (!form.price) errors.price = "Price is required";
    else if (isNaN(form.price) || Number(form.price) <= 0)
      errors.price = "Price must be a valid number greater than 0";
    if (!form.description) errors.description = "Description is required";
    if (!form.image) errors.image = "Image URL is required";
    if (!form.category) errors.category = "Category is required";
    return errors;
  };


  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateProduct(form));

    alert("Product updated Successfully ......")
    navigate(`/`);

  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} className="mt-3">

          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control"
            />
            {errors.title && <small className="text-danger">{errors.title}</small>}
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="form-control"
            />
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </div>

          <div className="mb-3">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-control"
            />
            {errors.image && <small className="text-danger">{errors.image}</small>}
          </div>

          <div className="mb-3">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-control"
            />
            {errors.category && <small className="text-danger">{errors.category}</small>}
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
            />
            {errors.description && (
              <small className="text-danger">{errors.description}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;

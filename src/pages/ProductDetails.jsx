
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../Slices/productsSlice";
import Header from "../components/Header";

const ProductDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) {
    return <p className="text-center my-5">Product not found.</p>;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(product.id));
      navigate("/"); 
    }
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p className="text-muted">Category: {product.category}</p>
            <h4 className="my-3">${product.price}</h4>
            <p>{product.description}</p>

            <div className="mt-4">
              <Link to={`/edit/${product.id}`} className="btn btn-primary me-2">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

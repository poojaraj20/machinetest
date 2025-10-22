
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 mb-5">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.title} style={{height: '200px', objectFit: 'contain'}} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-center">${product.price}</p>
          <div className="text-center">
            <Link to={`/product/${product.id}`} className="btn btn-info text-center">
            View Details
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

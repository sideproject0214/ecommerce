import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ products }) => {
  return products.map((product, index) => {
    return (
      <Link to={`product/${product.uuid}`} key={index}>
        <div className="product">
          <div className="product-header">
            <img src={product.image} alt={product.name} />
            {/* <ul className="icons">
              <span>
                <i className="far fa-heart"></i>
              </span>
              <span>
                <i className="fas fa-shopping-bag"></i>
              </span>
              <span>
                <i className="fas fa-search"></i>
              </span>
            </ul> */}
          </div>
          <div className="product-footer">
            <h3>{product.name}</h3>

            <Rating
              value={product.rating}
              text={`${product.numReviews} 리뷰`}
            />
            <div className="price-area">
              {product.sale !== 0 ? (
                <h2 className="sale">{product.sale}%</h2>
              ) : (
                ""
              )}
              <h2 className="price">{`${(
                (product.price * (100 - product.sale)) /
                100
              ).toLocaleString()}원`}</h2>
              {product.sale ? (
                <p className="original-price">{`${product.price.toLocaleString()}원`}</p>
              ) : (
                ""
              )}
            </div>
            <span>
              {product.freeShipping
                ? "무료배송"
                : `배송료: ${product.deliveryFee.toLocaleString()}원`}
            </span>
          </div>
        </div>
      </Link>
    );
  });
};

export default ProductCard;

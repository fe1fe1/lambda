import React from "react";
import "./ProductCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
const ProductCard = (props) => {
    return (
        <div>
            <div className="product-card">
                <div className="product-image">
                    <img
                        className="product-card-img"
                        src={props.product.image_url}
                        alt={props.product.product_name}
                    />
                </div>

                <div className="overlay">
                    <button className="buy-button">BUY</button>
                    <div className="cart-icon-container">
                        <FontAwesomeIcon
                            icon={faCartPlus}
                            size="3x"
                            className="cart-plus-icon"
                        />
                    </div>
                </div>

                <div className="product-card-info">
                    <h3>{props.product.product_name}</h3>
                    <div className="sub-info">
                        <div className="price">
                            <span>$500</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

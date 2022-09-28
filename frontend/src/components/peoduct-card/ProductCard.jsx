import React from "react";
import "./ProductCard.scss";

const ProductCard = (props) => {
    return (
        <div>
            <div className="product-card">
                <div className="product-image">
                    <img
                        className="product-card-img"
                        src={props.product.image}
                        alt={props.product.name}
                    />
                </div>
                <div className="product-card-info">
                    <h3>{props.product.name}</h3>
                    <div className="sub-info">
                        <div className="price">
                            <span>$500</span>
                        </div>
                    </div>
                </div>
                <div className="overlay">
                    <p>cart</p>
                    <p>buy</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

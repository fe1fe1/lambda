import React, { useState } from "react";
import "./ProductCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice";

const ProductCard = (props) => {
    const [quantity, setQuantity ] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItem({...props.product, quantity})) 
    }

    return (
        <div>
            <div className="product-card">
                <div className="product-image">
                    <img
                        className="product-card-img"
                        src={props.product.product_img}
                        alt={props.product.product_name}
                    />
                </div>

                <div className="overlay">
                    <button className="buy-button">BUY</button>
                    <div className="cart-icon-container" onClick={handleAddToCart}>
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
                            <span>${props.product.product_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

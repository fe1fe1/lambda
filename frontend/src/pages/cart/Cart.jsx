import React from "react";
import "./Cart.scss"
import { useSelector } from "react-redux";
import { addItem, emptyCart, removeItem, selectCartItems } from "../../features/cart/cartSlice.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector(selectCartItems);

    const handleDeleteFromCart = (itemId) => {
       dispatch(removeItem(itemId)) 
    };

    const handleDeleteAll = () => {
        dispatch(emptyCart()) 
    };

    const handleQuantityOnChange = (e, item) => {
        dispatch(addItem({...item, quantity: Number(e.target.value)})) 
    };

    const handleCheckoutOnClick = () =>{
       navigate('/checkout-shipping'); 
    };
 
    console.log(items);

    return (
        <div className="cart-container">
            <div className="block-container">
                    <ul className="cart-items-list">
                        <li>
                            <h3>
                                Shopping Cart
                            </h3>
                        </li>
                            {
                          items.length === 0 ?
                            <div>
                              Cart is empty
                          </div>
                            :
                            (<>{items.map(item =>
                                <li>
                                    <div className="cart-item-image">
                                        <img src={item.img} alt="product" />
                                    </div>
                                    <div className="cart-item-options">
                                        <div className="cart-item-name">
                                            {item.name}
                                        </div>
                                        <div>
                                            <select value={item.quantity} onChange={e => handleQuantityOnChange(e,item)}>
                                                {[...Array(item.stock).keys()].map(x =>
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )}
                                            </select>
                                            <button type="button" className="delete-item-button" onClick={() => handleDeleteFromCart(item.id)} >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        ${item.price}
                                    </div>
                                </li>
                            )}
                                <button type="button" className="delete-item-button" onClick={() => handleDeleteAll()} >
                                    Delete All
                                </button>
                            </>)
                        }
                    </ul>
                        <div className="cart-subtotal">
                          <h3>
                            Subtotal ( {items.reduce((a, c) => a + c.quantity, 0)} items)
                            :
                             $ {items.reduce((a, c) => a + c.price * c.quantity, 0)}
                          </h3>
                            {items.length > 0 ? (
                          <button  className="checkout-button" disabled={items.length === 0} onClick={handleCheckoutOnClick}>
                            Proceed to Checkout
                          </button>
                            ):(<></>)}

                        </div>
            </div>
        </div>
    )
}

export default Cart;

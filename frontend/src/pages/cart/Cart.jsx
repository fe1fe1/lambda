import React, { useState } from "react";
import "./Cart.scss"
import { useSelector } from "react-redux";
import { addItem, removeItem, selectCartItems } from "../../features/cart/cartSlice.js";

import { useDispatch } from "react-redux";

const Cart = () => {
    const dispatch = useDispatch();

    const items = useSelector(selectCartItems);

    const handleDeleteFromCart = (itemId) => {
       dispatch(removeItem(itemId)) 
    }

    const handleQuantityOnChange = (e, item) => {
        dispatch(addItem({...item, quantity: e.target.value})) 
    }

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
                            items.map(item =>
                              <li>
                                <div className="cart-image">
                                  <img src={item.product_img} alt="product" />
                                </div>
                                <div className="cart-name">
                                  <div>
                                      {item.product_name}
                                  </div>
                                  <div>
                                  <select value={item.quantity} onChange={e => handleQuantityOnChange(e,item)}>
                                      {[...Array(item.product_stock).keys()].map(x =>
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                      )}
                                    </select>
                                    <button type="button" className="delete-item-button" onClick={() => handleDeleteFromCart(item.id)} >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <div className="cart-price">
                                  ${item.product_price}
                                </div>
                              </li>
                            )
                        }
                    </ul>
                        <div className="cart-subtotal">
                          <h3>
                            Subtotal ( {items.reduce((a, c) => a + c.quantity, 0)} items)
                            :
                             $ {items.reduce((a, c) => a + c.product_price * c.quantity, 0)}
                          </h3>
                          <button  className="button primary full-width" disabled={items.length === 0}>
                            Proceed to Checkout
                          </button>

                        </div>
            </div>
        </div>
    )
}

export default Cart;

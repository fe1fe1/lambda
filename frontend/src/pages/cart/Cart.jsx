import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSlice.js";

const Cart = () => {

    const items = useSelector(selectCartItems);

    return (
        <div>
            <div className="block-container">
                <div className="cart-container">
                    <ul className="cart-item-list">
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
                                    Qty:
                                  <select value={item.qty} onChange={(e) => console.log(e.target.value)}>
                                      {[...Array(item.product_stock).keys()].map(x =>
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                      )}
                                    </select>
                                    <button type="button" className="button" onClick={() => console.log('delete button')} >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <div className="cart-price">
                                  ${item.price}
                                </div>
                              </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cart;

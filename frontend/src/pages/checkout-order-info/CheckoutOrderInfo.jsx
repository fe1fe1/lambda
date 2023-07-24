import { useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSlice";
import { selectCurrentShipping } from "../../features/shipping/shippingSlice";
import { selectCurrentUsername } from "../../features/user/userSlice";
import "./CheckoutOrderInfo.scss"

const CheckoutOrderInfo = () => {
    
    const userName = useSelector(selectCurrentUsername);
    const shipping = useSelector(selectCurrentShipping);
    const items = useSelector(selectCartItems);
    const itemsTotalPrice = items.reduce((a, c) => a + c.price * c.quantity, 0);
    const shippingPrice = itemsTotalPrice > 1000 ? itemsTotalPrice+15 : itemsTotalPrice;

    return (
        <div className="block-container order-info-container">
            <div className="row">
                <div className="col-75">
                    <div className="order-info-block shipping-info">
                        <strong>Name: </strong>{userName}
                        <br/>
                        <strong>Shipping: </strong>{shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
                    </div>
                    <div className="order-info-block items-info">
                        <strong>Order Items</strong>
                        {items.map(item => 
                            <li className="order-item-info">
                                <div className="cart-item-image">
                                    <img src={item.img} alt="product" />
                                </div>
                                <div className="cart-item-name">
                                    {item.name}
                                </div>
                                <div className="cart-price">
                                    {item.quantity} x ${item.price} = ${item.quantity*item.price}
                                </div>
                            </li>
                        )} 
                    </div>
                </div>
                <div className="col-25">
                    <div className="order-info-block">
                        <ul className="order-summary">
                            <li><strong>Order Summary</strong></li>
                            <li>
                                <div>Items</div> 
                                <div>${itemsTotalPrice}</div>
                            </li>
                            <li>
                                <div>Shipping</div>
                                <div>${shippingPrice}</div>
                            </li>
                            <li>
                                <strong>Order Total </strong>
                                <strong>${itemsTotalPrice+shippingPrice}</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOrderInfo;

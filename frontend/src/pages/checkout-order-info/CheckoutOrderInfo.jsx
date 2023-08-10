import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectCartItems } from "../../features/cart/cartSlice";
import { usePostUserOrderMutation } from "../../features/orders/ordersApiSlice";
import { selectCurrentShipping, selectValidShipping } from "../../features/shipping/shippingSlice";
import { selectCurrentUserId, selectCurrentUsername } from "../../features/user/userSlice";
import "./CheckoutOrderInfo.scss"

const CheckoutOrderInfo = () => {
    const navigate = useNavigate(); 
    const userId = useSelector(selectCurrentUserId);
    const userName = useSelector(selectCurrentUsername);
    const shipping = useSelector(selectCurrentShipping);
    const orderItems = useSelector(selectCartItems);
    const validShipping = useSelector(selectValidShipping);

    const [postOrder, orderPostingResult] = usePostUserOrderMutation();

    const itemsTotalPrice = orderItems.reduce((a, c) => a + c.price * c.quantity, 0);
    const shippingPrice = itemsTotalPrice > 1000 ? itemsTotalPrice+15 : itemsTotalPrice;

    useEffect(() => {
        if(!validShipping){
            navigate('/checkout-shipping');
        }
    }, [validShipping, navigate])

    const handleOnClick = async(e) =>{
        e.preventDefault();
        const postedOrder = await postOrder({ userId, orderItems }).unwrap();
        console.log('****ORDER POSTED****: ', postedOrder);
        console.log('****POSTING ERRORS****: ', orderPostingResult?.error);
        navigate('/checkout-payment');
    };

    return (
        <div className="block-container order-info-container">
            <div className="row">
                <div className="col-75">
                    <div className="order-info-block shipping-info">
                        <strong>Name: </strong>{userName}
                        <br/>
                        <strong>Shipping: </strong>{shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
                    </div>
                    <div className="order-info-block orderItems-info">
                        <strong>Order Items</strong>
                        {orderItems.map(item => 
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
                    <div className="order-info-block place-order-block">
                        <h3> Seems good? Place the order and proceed to payment!</h3>
                        <button className="checkout-button" onClick={handleOnClick}>Place order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOrderInfo;

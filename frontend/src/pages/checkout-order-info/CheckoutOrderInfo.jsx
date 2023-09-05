import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { emptyCart, selectCartItems } from "../../features/cart/cartSlice";
import { usePostUserOrderMutation } from "../../features/orders/ordersApiSlice";
import { usePostShippingMutation } from "../../features/shipping/shippingApiSlice";
import { selectCurrentShipping, selectValidShipping } from "../../features/shipping/shippingSlice";
import { selectCurrentUserId, selectCurrentUsername } from "../../features/user/userSlice";
import "./CheckoutOrderInfo.scss"

const CheckoutOrderInfo = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUserId);
    const userName = useSelector(selectCurrentUsername);
    const shipping = useSelector(selectCurrentShipping);
    const orderItems = useSelector(selectCartItems);
    const validShipping = useSelector(selectValidShipping);

    const fromAuth = location.state && location.state.fromCheckoutShipping

    const [postShipping, shippingPostingResult] = usePostShippingMutation();
    const [postOrder, orderPostingResult] = usePostUserOrderMutation();

    const itemsTotalPrice = orderItems.reduce((a, c) => a + c.price * c.quantity, 0);
    const shippingPrice = itemsTotalPrice > 1000 ? 15 : 0;

    useEffect(() => {
        console.log(orderItems.length);
        if(!fromAuth){
            navigate('/cart');
        }
        if(orderItems.length<=0){
            navigate('/');
        }
        if(!validShipping){
            navigate('/checkout-shipping');
        }
    }, [fromAuth, validShipping, navigate])

    const handleOnClick = async(e) =>{
        e.preventDefault();

        const postedShipping = await postShipping({ userId, ...shipping }).unwrap();

        const postedOrder = await postOrder({ userId, shippingId: postedShipping.id, orderItems }).unwrap();

        dispatch(emptyCart());
        
        navigate('/checkout-payment', { 
            state: { 
                fromCheckoutOrderInfo: true, 
                orderTotalPrice: itemsTotalPrice + shippingPrice,
                orderId: postedOrder.id
            } 
        });
    };

    return (
        <div className="block-container order-info-container navbar-margin">
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

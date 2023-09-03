import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectCurrentIsAdmin } from "../../features/user/userSlice";
import "./OrderListElement.scss";

const OrderListElement = (props) => {
    const isAdmin = useSelector(selectCurrentIsAdmin);
    const navigate = useNavigate();

    const handleFinishPayment = () =>{
        console.log('click')
        navigate('/checkout-payment', { 
            state: { 
                fromOrdersList: true, 
                orderTotalPrice: props.order.total_price,
                orderId: props.order.id
            }
        }); 
    };

    const handleCancelOrder = () =>{
         
    };

    return (
        <div className="order-list-element-container">
            <div>
                <h4>Order ID: {props.order.id}</h4>
            </div>
            <div className="info-container">
                <div className="info-bracket">
                    <div>
                        <strong>Buyer:</strong>
                        <p>{props.order.name}, {props.order.email}</p>
                    </div>
                    <div>
                        <strong>Address: </strong> 
                        <p>{props.order.address}, {props.order.city}, {props.order.postal_code}, {props.order.country}</p>
                    </div>
                </div>

                <div className="info-bracket">
                    <div>
                        <strong>{props.order.is_delivered === 0 ? <>Not Delivered</> : <>Delivered</>}</strong>                  
                    </div>
                    <div>
                        <strong>{props.order.is_paid === 0 ? <>Not Paid</> : <>Paid</>}</strong>                  
                        <p></p>
                    </div>

                    <div>
                        <strong>Total: </strong>
                        <p>${props.order.total_price}</p>
                    </div>
                </div>
            </div>
            {
                isAdmin === 1 ? 
                <div className="order-list-element-action">Set to Delivered</div>
                :
                props.order.is_paid === 0 && <div className="order-list-element-action" onClick={handleFinishPayment}>finish payment</div>  
            }
            {
                (isAdmin === 1 || props.order.is_paid === 0) 
                && <div className="order-list-element-action" onClick={handleCancelOrder}>cancel order</div>
            }
        </div>
    )
}

export default OrderListElement;

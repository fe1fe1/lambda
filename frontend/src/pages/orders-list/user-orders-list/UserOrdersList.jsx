import "./UserOrdersList.scss";
import { useGetUserOrdersQuery } from "../../../features/orders/ordersApiSlice";
import OrderListElement from "../../../components/order-list-element/OrderListElement";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../features/user/userSlice";


const UserOrdersList = () => {
    const userId = useSelector(selectCurrentUserId);
    const { data: orders,
            isLoading,
            isSuccess,
            isError,
            error
    } = useGetUserOrdersQuery(userId);
    console.log(orders);
    return (
        <div className="orders-list-container">
            <ul className="orders-list"> 
                {
                    isSuccess ? (
                        orders.map((order) => 
                            <li className="order">
                                <OrderListElement order={order}/>      
                            </li>
                        )
                    ) : (
                        isError ? (
                            <>
                                <p>Error</p>
                                <p>Message: {error.message}</p>
                                {console.log('ERROR: ',error)}
                            </>
                        ) : (
                            <p>Something went wrong</p>
                        )
                    ) 
                } 
            </ul>
        </div>
    )
}

export default UserOrdersList;

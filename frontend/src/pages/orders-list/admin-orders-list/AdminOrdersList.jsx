import "../OrdersList.scss"
import { useGetOrdersQuery } from "../../../features/orders/ordersApiSlice";
import OrderListElement from "../../../components/order-list-element/OrderListElement";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../features/user/userSlice";


const AdminOrdersList = () => {
    const { data: orders,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetOrdersQuery();
    console.log(orders);
    return (
        <div className="orders-list-container navbar-margin">
            <ul className="orders-list"> 
                {
                    isLoading ? 
                        <p>Loading...</p>
                    : (
                        isSuccess ? (
                            orders.map((order) => 
                                <li className="order">
                                    <OrderListElement order={order}/>      
                                </li>
                            )
                        ) : (
                            isError ? (
                                <>
                                    <p>Error: {error?.data?.message}</p>
                                    {console.log('ERROR: ',error?.data?.message)}
                                </>
                            ) : (
                                <p>Something went wrong</p>
                            )
                        ) 
                    )
                } 
            </ul>
        </div>
    )
}

export default AdminOrdersList;

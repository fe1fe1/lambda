import "../OrdersList.scss"
import { useGetUserOrdersQuery } from "../../../features/orders/ordersApiSlice";
import OrderListElement from "../../../components/order-list-element/OrderListElement";
import { useSelector } from "react-redux";
import { selectCurrentIsAdmin, selectCurrentUserId } from "../../../features/user/userSlice";


const AdminOrdersList = () => {
    const userId = useSelector(selectCurrentUserId);
    const isUserAdmin = useSelector(selectCurrentIsAdmin);
    const { data: orders,
            isLoading,
            isSuccess,
            isError,
            error
        } = useGetUserOrdersQuery(userId);
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

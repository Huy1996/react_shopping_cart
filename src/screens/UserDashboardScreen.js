import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {detailsUser} from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {listOrderUser} from "../actions/orderAction";
import {listReviewUser} from "../actions/reviewAction";
import Review from "../components/Review";
import OrderItem from "../components/OrderItem";

export default function UserDashboardScreen(props) {

    const {id='none'} = useParams();
    const navigate = useNavigate();

    // Access Store
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const orderListUser = useSelector(state => state.orderListUser);
    const {loading: loadingOrder, error: errorOrder, count: countOrder, orders} = orderListUser;

    const reviewUserList = useSelector(state => state.reviewUserList);
    const {loading: loadingReview, error: errorReview, count: countReview, reviews} = reviewUserList;

    const dispatch = useDispatch()

    useEffect(() => {
        const userId = id !== 'none' ? id : userInfo._id;
        dispatch(detailsUser(userId));
        dispatch(listOrderUser({userId}));
        dispatch(listReviewUser({userId}));

    },[dispatch, navigate, id])

    return (
        loading ? (<LoadingBox />)
            : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
            <div>
                <div className='row col'>
                    <div className='col-1'>
                        <h3>{user.name} <button type='button' style={{borderRadius:"100%"}}><i className="fas fa-user-cog" /></button></h3>
                        <h2>Email: {user.email}</h2>
                        <h2>User Type: {user.isAdmin ? user.email === "admin@example.com" ? 'Admin' : 'Co-Admin' : 'Customer'}</h2>
                    </div>
                </div>
                <ul className='row summary'>
                    <li>
                        <div className='summary-title color1'>
                            <span>
                                <i className="fas fa-comment-alt" /> Reviews
                            </span>
                        </div>
                        <div className='summary-body'>
                            {countReview}
                        </div>
                    </li>
                    <li>
                        <div className='summary-title color2'>
                            <span>
                                <i className='fa fa-shopping-cart'/> Orders
                            </span>
                        </div>
                        <div className='summary-body'>
                            {countOrder}
                        </div>
                    </li>
                </ul>
                <div className='card cart-body'>
                    <h3>Reviews</h3>
                    {loadingReview ? <LoadingBox /> :
                        errorReview ? <MessageBox variant='danger' >{errorReview}</MessageBox> :
                        countReview === 0 ? <MessageBox>{user.name} haven't posted any product reviews.</MessageBox> :
                            reviews.map((review) => (
                                <div className='row card cart-body'>
                                    <div>
                                        <Link to={`/product/${review.product._id}`}>
                                            <h1>{review.product.name}</h1>
                                        </Link>
                                        <img src={review.product.image} className='small'/>
                                    </div>
                                    <Review review={review} name={false} />
                                </div>
                    ))}
                </div>
                <div className='card cart-body'>
                    <h3>Orders</h3>
                    {loadingOrder ? <LoadingBox/> :
                        errorOrder ? <MessageBox variant='danger'>{errorOrder}</MessageBox> :
                            countOrder === 0 ? <MessageBox>{user.name} haven't purchased anything.</MessageBox> :
                                orders.map((order) =>(
                                    <div className='row col card cart-body'>
                                        <div className='min-30'>
                                            {order.isDelivered ? (
                                                <MessageBox variant="success">
                                                    Delivered at {order.deliveredAt.substring(0, 10)}
                                                </MessageBox>
                                            ) : (
                                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                            )}
                                            <h2 />
                                            {order.isPaid ? (
                                                <MessageBox variant="success">
                                                    Paid at {order.paidAt.substring(0, 10)}
                                                </MessageBox>
                                            ) : (
                                                <div>
                                                    <MessageBox variant="danger">
                                                        Not Paid <Link to={`/order/${order._id}`}>Pay Order Now</Link>
                                                    </MessageBox>

                                                </div>
                                            )}
                                        </div>
                                        <div className='card cart-body col-2'>
                                            <Link to={`/order/${order._id}`}>
                                                <h2>Order ID: {order._id}</h2>
                                            </Link>
                                            <h1>{order.createdAt.substring(0, 10)}</h1>
                                            <OrderItem order={order}/>
                                        </div>
                                    </div>


                    ))}
                </div>
            </div>
            )
    );
}
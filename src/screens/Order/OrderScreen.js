import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {cancelOrder, deliverOrder, detailsOrder, payOrder} from '../../actions/orderAction';
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET, ORDER_REQUEST_CANCEL_RESET} from '../../constants/orderConstant';
import OrderItem from "../../components/Order/OrderItem";

export default function OrderScreen(props) {
    const params = useParams();
    const {id: orderId} = params;


    // Redux store section
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;

    const orderRequestCancel = useSelector(state => state.orderRequestCancel);
    const { loading: loadingRequest, error: errorRequest, success: successRequest} = orderRequestCancel;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!order || successDeliver || successRequest ||(order && order._id !== orderId)) {
            dispatch({ 
                type: ORDER_DELIVER_RESET 
            });
            dispatch({
                type: ORDER_REQUEST_CANCEL_RESET
            })
            dispatch(detailsOrder(orderId));
        }
      }, [dispatch, order, orderId, successDeliver, successRequest]);
    
    const successPaymentHandler = (paymentResult) => {
        // TODO: dispatch pay order
        dispatch(payOrder(order, paymentResult))
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };

    const cancelRequestHandler = () => {
        dispatch(cancelOrder(order._id));
    }

    return loading ? (<LoadingBox />):
            error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :(
        <div>
            <h1>Order {order._id}</h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul className='none'>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}                                    
                                </p>
                                {
                                    order.isDelivered ? (
                                        <MessageBox variant="success">
                                            Delivered at {order.deliveredAt.substring(0, 10)}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">Not Delivered</MessageBox>
                                    )
                                }                                
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Name:</strong> {order.paymentMethod}
                                </p>
                                <MessageBox variant="success">
                                    Paid at {order.createdAt.substring(0, 10)}
                                </MessageBox>
                            </div>
                        </li>
                        <li>
                            <OrderItem order={order} />
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul className='none'>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                        <strong>Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${order.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            {!order.requestCancel && userInfo._id === order.user && (<button type='button' onClick={cancelRequestHandler}>Cancel order</button>) }
                            {order.requestCancel && !order.isCanceled && userInfo.isAdmin ?
                                <button type='button'>Confirm Cancel</button> :
                                userInfo.isAdmin && !order.isDelivered && (
                                    <li>
                                        {loadingDeliver && (<LoadingBox />)}
                                        {errorDeliver && (<MessageBox variant="danger">{errorDeliver}</MessageBox>)}
                                        <button
                                            type='button'
                                            className='primary block'
                                            onClick={deliverHandler}
                                        >
                                            Deliver Order
                                        </button>
                                    </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

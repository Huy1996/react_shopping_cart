import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderAction';
import CheckoutSteps from '../../components/Order/CheckoutSteps'
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import { ORDER_CREATE_RESET } from '../../constants/orderConstant';
import { useNavigate } from 'react-router-dom';

export default function PlaceOrderScreen(props) {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    if(!paymentMethod){
        navigate('/payment')
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const dispatch = useDispatch();

    const toPrice       = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice     = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice  = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice       = toPrice(0.1 * cart.itemsPrice);
    cart.totalPrice     = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {
        // Todo: dispatch place order
        dispatch(createOrder({
            ...cart, 
            orderItems: cartItems
        }));
    }

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET,
            });
        }
    }, [dispatch, order, navigate, success]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='row top'>
                <div className='col-2'>
                    <ul className='none'>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                                    
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Name:</strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cartItems.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="small"
                                                        ></img>                                                
                                                    </div>
                                                    <div className='min-30'>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>                                            
                                                    <div>
                                                        {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                                                    </div>                                            
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
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
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>
                                        <strong>Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={placeOrderHandler} 
                                    className='primary block'
                                    disabled={cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading ? (<LoadingBox />) : (<></>)}
                            {error ? (<MessageBox variant="danger">{error}</MessageBox>) : (<></>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
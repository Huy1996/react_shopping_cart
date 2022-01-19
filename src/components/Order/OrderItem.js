import React from 'react';
import {Link} from "react-router-dom";

function OrderItem(props) {

    return (
        <div className='card card-body'>
            <h2>Order Items</h2>
            <ul className='none'>
                {
                    props.order.orderItems.map((item) => (
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
    );
}

export default OrderItem;
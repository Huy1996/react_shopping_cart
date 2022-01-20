import React from 'react';
import {Link} from "react-router-dom";

function OrderItem(props) {

    return (
        <div className='card card-body'>
            <h2 style={{paddingTop: '0'}}>Order Items</h2>
            <ul>
                {
                    props.order.orderItems.map((item) => (
                        <li key={item.product} className='none'>
                            <div className="row col order-detail" >
                                <div className='col-1 product-image'>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="small"
                                    ></img>
                                </div>
                                <div className='min-30 col-2 product-name'>
                                    <Link to={`/product/${item.product}`}>
                                        <h2>{item.name}</h2>
                                    </Link>
                                </div>
                                <div className='col-3 order-total'>
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

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {detailsUser} from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {listOrderUser} from "../actions/orderAction";
import {listReviewUser} from "../actions/reviewAction";

export default function UserDashboardScreen(props) {

    const {id='none'} = useParams();
    const navigate = useNavigate();

    // Access Store
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const orderListUser = useSelector(state => state.orderListUser);
    const {loading: loadingOrder, error: errorOrder, count: countOrder} = orderListUser;

    const reviewUserList = useSelector(state => state.reviewUserList);
    const {loading: loadingReview, error: errorReview, count: countReview} = reviewUserList;

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

            </div>
            )
    );
}
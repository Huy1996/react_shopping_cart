import React, {useEffect, useState} from 'react'
import MessageBox from "./MessageBox";
import Rating from "./Rating";
import {useDispatch, useSelector} from "react-redux";
import {createReview, deleteReview, listReviewProduct, updateReview} from "../actions/reviewAction.js";
import LoadingBox from "./LoadingBox";
import {REVIEW_DELETE_RESET, REVIEW_UPDATE_RESET} from "../constants/reviewConstant";
import ReviewEditor from "./ReviewEditor";

export default function Review(props) {
    const [edit, setEdit]           = useState(false);
    const [rating, setRating]       = useState();
    const [comment, setComment]     = useState("");

    const reviewProductList         = useSelector(state => state.reviewProductList);
    const {loading:loadingReviews, error: errorReviews, reviews} = reviewProductList;

    const userSignin                = useSelector(state => state.userSignin);
    const { userInfo }              = userSignin;

    const reviewDelete              = useSelector(state => state.reviewDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = reviewDelete;

    const reviewUpdate              = useSelector(state => state.reviewUpdate);
    const {loading: loadingUpdate, success: successUpdate, error: errorUpdate} = reviewUpdate;


    const dispatch                  = useDispatch();
    useEffect(() => {
        if(successDelete){
            window.alert('Review Deleted Successfully');
            dispatch({
                type: REVIEW_DELETE_RESET
            })
        }
        if(successUpdate){
            window.alert('Review Updated Successfully');
            setEdit(false)
            dispatch({
                type: REVIEW_UPDATE_RESET
            })
        }
        dispatch(listReviewProduct(props.productId));
        console.log(reviews)
    }, [dispatch, props.productId, successDelete, successUpdate])

    const deleteHandler = (review) => {
        if(window.confirm('Are you sure to delele?')){
            dispatch(deleteReview(review._id));
        }
    }

    const submitHandler = (e, reviewId) => {
        // to submit comment
        e.preventDefault();
        if(comment && rating){
            dispatch(updateReview(reviewId, {rating, comment}))
        }
        else{
            alert('Please enter comment and rating')
        }
    };

    return (
        <div>
            <h2 id="reviews">Reviews</h2>
            {loadingReviews && <LoadingBox />}
            {errorReviews && <MessageBox variant='danger' >{errorReviews}</MessageBox>}
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {reviews ? (reviews.length === 0 ? (<MessageBox>There is no reviews</MessageBox>) :
                (
                    <ul>
                        {reviews.map((review) => (
                            <li key={review._id}>
                                <div className='top row col'>
                                    <div className='col-2'>
                                        <div
                                            style={{backgroundColor: '#D9D7F1'}}
                                            className="row"
                                        >
                                            <div>
                                                <p><strong>{review.user.name}</strong> {review.createdAt.substring(0, 10)}
                                                </p>
                                            </div>
                                            <div>
                                                {userInfo ?
                                                    (userInfo._id === review.user._id &&
                                                        (<button type='button'
                                                                 className='small'
                                                                 onClick={() => setEdit(!edit)}
                                                        >
                                                            <i className="fa fa-edit"/>
                                                        </button>
                                                        )) : <></>
                                                }
                                                {userInfo ?
                                                    ((userInfo._id === review.user._id || userInfo.isAdmin) &&
                                                        (<button type='button'
                                                                 className='small'
                                                                 onClick={() => deleteHandler(review)}
                                                        >
                                                            <i className="fa fa-trash"/>
                                                        </button>))
                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                        <div style={{backgroundColor: '#FFFDDE'}}>
                                            <Rating rating={review.rating} caption=" "/>
                                            <p>{review.comment}</p>
                                        </div>
                                        {edit && userInfo._id === review.user._id &&
                                        <>
                                            <ReviewEditor
                                                submitHandler={(e) => submitHandler(e, review._id)}
                                                title="Edit your review"
                                                rating={rating}
                                                updateRating={(value) => setRating(value)}
                                                updateComment={(value) => setComment(value)}
                                                button='Edit'
                                            />
                                            {loadingUpdate && <LoadingBox/>}
                                            {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                                        </>
                                        }
                                    </div>
                                    <div className="col-2"></div>
                                </div>

                            </li>
                        ))}
                    </ul>
                )) : <></>
            }
        </div>
    )
}



/*

<div>
                                    <h2 id="reviews">Reviews</h2>
                                    {product.reviews.length === 0 && (<MessageBox>There is no reviews</MessageBox>)}
                                    <ul>
                                        {product.reviews.map((review) => (
                                            <li key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating rating={review.rating} caption=" "/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </li>
                                        ))}
                                        <li>
                                            {userInfo ? (
                                                <form className='form' onSubmit={submitHandler}>
                                                    <div>
                                                        <h2>Write a customer review</h2>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="rating">Rating</label>
                                                        <select
                                                            id="rating"
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="1">1 - Poor</option>
                                                            <option value="2">2 - Fair</option>
                                                            <option value="3">3 - Good</option>
                                                            <option value="4">4 - Very good</option>
                                                            <option value="5">5 - Excelent</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor='comment'>Comment</label>
                                                        <textarea
                                                            id="comment"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label />
                                                        <button
                                                            className='primary'
                                                            type='submit'
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                    <div>
                                                        {loadingReviewCreate && (<LoadingBox />)}
                                                        {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                                                    </div>
                                                </form>
                                            ) : (
                                                <MessageBox>
                                                    Please <Link to="/signin">Sign In</Link> to write a review
                                                </MessageBox>
                                            )}
                                        </li>
                                    </ul>
                                </div>

 */
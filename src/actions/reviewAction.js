import * as rc from '../constants/reviewConstant'
import {fetching} from "../helper";
import * as method from "../constants/AJAXConstant"

export const listReviewProduct = (productId) => async (dispatch) => {
    const url = `/api/reviews/product/${productId}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        rc.REVIEW_PRODUCT_LIST_REQUEST,
        rc.REVIEW_PRODUCT_LIST_SUCCESS,
        rc.REVIEW_PRODUCT_LIST_FAIL
    );
}

export const deleteReview = (reviewId) => async (dispatch, getState) => {
    const { userSignin:{userInfo} } = getState();
    const url = `/api/reviews/${reviewId}`;
    await fetching(
        dispatch,
        method.DELETE,
        url,
        rc.REVIEW_DELETE_REQUEST,
        rc.REVIEW_DELETE_SUCCESS,
        rc.REVIEW_DELETE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    );
}
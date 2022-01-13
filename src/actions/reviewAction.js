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
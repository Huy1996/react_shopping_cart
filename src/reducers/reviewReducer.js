import * as rc from "../constants/reviewConstant";

export const reviewProductListReducer = (state = {loading:true, reviews:[]}, action) => {
    switch(action.type){
        case rc.REVIEW_PRODUCT_LIST_REQUEST:
            return{
                loading: true
            };
        case rc.REVIEW_PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            };
        case rc.REVIEW_PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const reviewDeleteReducer = (state={loading:false}, action) => {
    switch (action.type){
        case rc.REVIEW_DELETE_REQUEST:
            return{
                loading: true
            };
        case rc.REVIEW_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case rc.REVIEW_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
import * as cc from "../constants/cartConstant";

export const cartReducers = (state = {cartItems: []}, action) => {
    switch(action.type){
        case cc.CART_ADD_ITEM: {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => {
                        if (x.product === existItem.product) {
                            if (item.qty + x.qty <= item.countInStock) {
                                item.qty += x.qty;
                                return item;
                            } else {
                                item.qty = item.countInStock
                                return item;
                            }
                        } else {
                            return x;
                        }
                    }),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
            ;
        }
        case cc.CART_EDIT_ITEM: {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
            ;
        }
        case cc.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
            };
        case cc.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case cc.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case cc.CART_EMPTY:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
}

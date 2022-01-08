import { CART_EMPTY } from '../constants/cartConstant';
import * as oc from '../constants/orderConstant';
import { fetching } from '../helper.js';
import * as method from '../constants/AJAXConstant'

export const createOrder = (order) => async(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = '/api/orders';
    await fetching(
        dispatch,
        method.POST,
        url,
        order,
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_CREATE_REQUEST,
        oc.ORDER_CREATE_SUCCESS,
        oc.ORDER_CREATE_FAIL,
        true,
        CART_EMPTY
    )
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        {},
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_DETAIL_REQUEST,
        oc.ORDER_DETAIL_SUCCESS,
        oc.ORDER_DETAIL_FAIL,
    );
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${order._id}/pay`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        paymentResult,
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_PAY_REQUEST,
        oc.ORDER_PAY_SUCCESS,
        oc.ORDER_PAY_FAIL
    )
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}/deliver`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        {},
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_DELIVER_REQUEST,
        oc.ORDER_DELIVER_SUCCESS,
        oc.ORDER_DELIVER_FAIL
    )
}

export const listOrderMine = () => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = '/api/orders/mine';
    await fetching(
        dispatch,
        method.GET,
        url,
        {},
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_MINE_LIST_REQUEST,
        oc.ORDER_MINE_LIST_SUCCESS,
        oc.ORDER_MINE_LIST_FAIL
    )
}

export const listOrder = ({pageNumber=''}) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders?pageNumber=${pageNumber}`;
    await fetching(
        dispatch,
        method.GET,
        url,
        {},
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_LIST_REQUEST,
        oc.ORDER_LIST_SUCCESS,
        oc.ORDER_LIST_FAIL
    )
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/${orderId}`;
    await fetching(
        dispatch,
        method.DELETE,
        url,
        {},
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_DELETE_REQUEST,
        oc.ORDER_DELETE_SUCCESS,
        oc.ORDER_DELETE_FAIL
    )
}

export const summaryOrder = () => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/orders/summary`;
    await fetching(
        dispatch,
        method.GET,
        url,
        {},
        {Authorization: `Bearer ${userInfo.token}`},
        oc.ORDER_SUMMARY_REQUEST,
        oc.ORDER_SUMMARY_SUCCESS,
        oc.ORDER_SUMMARY_FAIL
    )
}
import * as uc from '../constants/userConstant'
import {fetching} from "../helper";
import * as method from "../constants/AJAXConstant"
import {USER_INFO} from "../constants/storageConstant";

export const signin = (email, password) => async (dispatch) => {
    const url = '/api/users/signin';
    await fetching(
        dispatch,
        method.POST,
        url,
        uc.USER_SIGNIN_REQUEST,
        uc.USER_SIGNIN_SUCCESS,
        uc.USER_SIGNIN_FAIL,
        {
            sendData:   {email, password},
            store:      true,
            storeName:  USER_INFO
        }
    )

}

export const  register = (name, email, password) => async (dispatch) => {
    const url = '/api/users/register';
    await fetching(
        dispatch,
        method.POST,
        url,
        uc.USER_REGISTER_REQUEST,
        uc.USER_REGISTER_SUCCESS,
        uc.USER_REGISTER_FAIL,
        {
            sendData:       {name, email, password},
            secondDispatch: true,
            secondConstant: uc.USER_SIGNIN_SUCCESS,
            store:          true,
            storeName:      USER_INFO
        }
    )
}

export const signout = () => (dispatch) => {
    dispatch({
        type: uc.USER_SIGNOUT,
    })
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/users/${userId}`;
    fetching(
        dispatch,
        method.GET,
        url,
        uc.USER_DETAILS_REQUEST,
        uc.USER_DETAILS_SUCCESS,
        uc.USER_DELETE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/users/profile`;
    await fetching(
        dispatch,
        method.PUT,
        url,
        uc.USER_UPDATE_PROFILE_REQUEST,
        uc.USER_UPDATE_PROFILE_SUCCESS,
        uc.USER_UPDATE_PROFILE_FAIL,
        {
            sendData:       user,
            header:         {Authorization: `Bearer ${userInfo.token}`},
            secondDispatch: true,
            secondConstant: uc.USER_SIGNIN_SUCCESS,
            store:          true,
            storeName:      USER_INFO
        }
    )
}

export const listUsers = ({pageNumber=''}) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/users?pageNumber=${pageNumber}`;
    fetching(
        dispatch,
        method.GET,
        url,
        uc.USER_LIST_REQUEST,
        uc.USER_LIST_SUCCESS,
        uc.USER_LIST_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const deleteUser = (userId) => async(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/users/${userId}`;
    fetching(
        dispatch,
        method.DELETE,
        url,
        uc.USER_DELETE_REQUEST,
        uc.USER_DELETE_SUCCESS,
        uc.USER_DELETE_FAIL,
        {
            header: {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}

export const updateUser = (user) => async (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    const url = `/api/users/${user._id}`;
    fetching(
        dispatch,
        method.PUT,
        url,
        uc.USER_UPDATE_REQUEST,
        uc.USER_UPDATE_SUCCESS,
        uc.USER_UPDATE_FAIL,
        {
            sendData:   user,
            header:     {Authorization: `Bearer ${userInfo.token}`}
        }
    )
}
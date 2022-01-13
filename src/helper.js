import axios from "axios"
import * as sc from "./constants/storageConstant";

export const getStorage = (storage) => {
    return localStorage.getItem(storage)
            ? JSON.parse(localStorage.getItem(storage))
            : ( storage === sc.SHIPPING_ADDRESS ? {} :
                storage === sc.CART_ITEMS       ? [] : null)
}


/**
 * @param {function} dispatch to dispatch an action
 * @param {string} method to identify request type
 * @param {string} url url to the API route
 * @param {string} requestConstant action type for requesting
 * @param {string} successConstant action type for successful request
 * @param {string} failConstant action type for failure request
 * @param {option} option contain all optional request body/header or second dispatch
 */
export const fetching = async (dispatch, method, url, requestConstant, successConstant, failConstant,
                               option={
                                           sendData:{},
                                           header:{},
                                           secondDispatch:false,
                                           secondConstant:'',
                                           store:false,
                                           storeName:''
                                        }) => {
    dispatch({
        type: requestConstant,
        payload: option.sendData,
    });
    try{
        //const { data } = await Axios.get(url);
        const {data} = await axios({
            method: method,
            url: url,
            data: option.sendData,
            headers: option.header,
        })

        dispatch({
            type:       successConstant,
            payload:    data
        })
        // Handle second dispatch if applicable
        if(option.secondDispatch){
            dispatch({
                type:       option.secondConstant,
                payload:    data
            })
        }
        // Handle store request to local storage
        if(option.store){
            localStorage.setItem(option.storeName, JSON.stringify(data));
        }
    }
    catch(error){
        const message = error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message;
        dispatch({
            type:       failConstant,
            payload:    message
        })
    }
}

// Price range
export const prices = [
    {
        name:'Any',
        min: 0,
        max: 0,
    },
    {
        name:'$1 to $10',
        min: 1,
        max: 10,
    },
    {
        name:'$10 to $100',
        min: 10,
        max: 100,
    },
    {
        name:'$100 to $1000',
        min: 100,
        max: 1000,
    }
];

// Rating range
export const ratings = [
    {
        name:'4 stars & up',
        rating: 4,
    },
    {
        name:'3 stars & up',
        rating: 3,
    },
    {
        name:'2 stars & up',
        rating: 2,
    },
    {
        name:'1 stars & up',
        rating: 1,
    },
]


export const CREDENTIAL = 'CREDENTIAL'
export const UPDATE_LOGIN = 'UPDATE_LOGIN'
export const  ADD_ORDERS = 'ADD_ORDER'
export const  RESET = 'RESET'
export const  GET_DETAILS = 'GET_DETAILS'
export const  STATUS = 'STATUS'
export const  CANCEL = 'CANCEL'
export const  PRODUCTS = 'PRODUCTS'
export const  ALL_ORDERS = 'ALL_ORDERS'
export const  CARD_STATUS_DELIVERY = 'CARD_STATUS_DELIVERY'
export const  SET_STATUS_FOOD = 'SET_STATUS_FOOD'
export const  SET_CRONO = 'SET_CRONO'
export const  UPDATE_STATUS_STORE = 'UPDATE_STATUS_STORE'
export const  UPDATE_ITEM = 'UPDATE_ITEM'
export const  EMPTY_DETAILS = 'EMPTY_DETAILS'
export const  GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'


const axios = require('axios').default;
// process.env.REACT_APP_URL

const url = "https://altonono.herokuapp.com/"

export function accessAdmin(){
    return async function (dispatch){  
       const res = await fetch(`${url}getAdmin`)
       const info = await res.json()
       return dispatch({ type: CREDENTIAL, payload: info })
    }        
 }

 export function updatePassword(newPassword){
    return async function (dispatch){  
       const res = await axios.post(`${url}admin/${newPassword}`)
       
    }        
 }


export const addOrder = (payload) => {
    return{
        type: ADD_ORDERS,
        payload: payload
    }
}



export const reset = () => {
    return{
        type: RESET
    }
}

export function getDetails(id){
    return async function (dispatch){  
       const res = await fetch(`${url}details/${id}`)
       const info = await res.json()
       return dispatch({ type: GET_DETAILS, payload: info })
    }        
 }

 export function getProducts(){
    return async function (dispatch){  
       const res = await fetch(`${url}`)
       const info = await res.json()
       return dispatch({ type: PRODUCTS, payload: info })
    }         
 }

 export function getProductDetail(id){
    return async function (dispatch){  
       const res = await fetch(`${url}getProduct/${id}`)
       const info = await res.json()
       return dispatch({ type: GET_PRODUCT_BY_ID, payload: info })
    }        
 }

 

 export function getStatus(){
     return async function(dispatch){
       const res = await axios.get(`${url}getStatus`)
       return dispatch({ type: STATUS, payload: res.data})
     }
 }

 export function updateStatus(stat){
    return async function(dispatch){
      const res = await axios.post(`${url}status/${stat}`)
      return dispatch({ type: UPDATE_STATUS_STORE, payload: res.data})
    }
}

export function updateFullItem(item){
    return async function(dispatch){
      const res = await axios.post(`${url}updateTheWholeItem`, item)
     console.log('res', res)
    }
}

export function updateItem(item){
    return async function(dispatch){
      const res = await axios.post(`${url}updateItem`, item)
    
      return dispatch({ type: UPDATE_ITEM, payload: res.data[1]})
    }
}

export function cancelar (value){
    return{
        type: CANCEL,
        payload: value
    }
}

export function setStatusFood (value){
    return{
        type: SET_STATUS_FOOD,
        payload: value
    }
}

export function getCardStatus (value){
    return{
        type: CARD_STATUS_DELIVERY,
        payload: value
    }
}

export function completedOrder (value){
    return{
        type: ALL_ORDERS,
        payload: value
    }
}

export function setCrono (value){
    return{
        type: SET_CRONO,
        payload: value
    }
}

export function updateLogin (value){
    return{
        type: UPDATE_LOGIN,
        payload: value
    }
}


export function emptyDetails (){

    return{
        type: EMPTY_DETAILS,
    }
}
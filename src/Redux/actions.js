export const CREDENTIAL = 'CREDENTIAL'
export const UPDATE_LOGIN = 'UPDATE_LOGIN'
export const  ADD_ORDERS = 'ADD_ORDER'
export const  RESET = 'RESET'
export const  ADD_CLIENT = 'ADD_CLIENT'
export const  DELETE_ITEM = 'DELETE_ITEM'
export const  ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const  SUSTRACT_TO_CART = 'SUSTRACT_TO_CART'
export const  GET_DETAILS = 'GET_DETAILS'
export const  STATUS = 'STATUS'
export const  CANCEL = 'CANCEL'
export const  PRODUCTS = 'PRODUCTS'
export const  ALL_ORDERS = 'ALL_ORDERS'
export const  CARD_STATUS_DELIVERY = 'CARD_STATUS_DELIVERY'
export const  SET_CRONO = 'SET_CRONO'
export const  UPDATE_STATUS_STORE = 'UPDATE_STATUS_STORE'
export const  UPDATE_STATUS_ORDER_IN_QUEUE = 'UPDATE_STATUS_ORDER_IN_QUEUE'
export const  UPDATE_STATUS_ORDER_IN_CONFIRM = 'UPDATE_STATUS_ORDER_IN_CONFIRM'
export const  UPDATE_ITEM = 'UPDATE_ITEM'
export const  EMPTY_DETAILS = 'EMPTY_DETAILS'
export const  GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const  GET_ALL_ORDERS = 'GET_ALL_ORDERS'
export const  GET_ORDERS_BY_DATE = 'GET_ORDERS_BY_DATE'
export const  FILTER_ORDERS = 'FILTER_ORDERS'
export const  GET_ALL_USERS = 'GET_ALL_USERS'
export const  GET_USER_BY_ID = 'GET_USER_BY_ID'
export const  ORDER_OF_THE_DAY = 'ORDER_OF_THE_DAY'
export const  RESET_CART = 'RESET_CART'
export const  FIND_PRODUCT = 'FIND_PRODUCT'


const axios = require('axios').default;

const url = 'https://altonono.herokuapp.com/'



export function accessAdmin(payload){
    return async function (dispatch){  
       const res = await axios.post(`${url}credenciales`, payload)
       return dispatch({ type: CREDENTIAL, payload: res.data })
    }        
 }

 export function updatePassword(newPassword){
    return async function (dispatch){  
       const res = await axios.post(`${url}admin/${newPassword}`)
       
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

 export function getAllOrders(){
    return async function(dispatch){
      const res = await axios.get(`${url}getAllOrders`)
      return dispatch({ type: GET_ALL_ORDERS, payload: res.data})
    }
}


 export function getAllOrdersOfTheDay(){
    return async function(dispatch){
      const res = await axios.get(`${url}getOrderByOfTheDay`)
      return dispatch({ type: ORDER_OF_THE_DAY, payload: res.data})
    }
}

 
 
 export function getStatus(){
     return async function(dispatch){
       const res = await axios.get(`${url}getstatus`)
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
    }
}

export function updateItem(item){
    return async function(dispatch){
      const res = await axios.post(`${url}updateItem`, item)
      return dispatch({ type: UPDATE_ITEM, payload: res.data[1]})
    }
}

export function createUser(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}createWaiter`, payload)
    }
}

export function getAllUser(){
    return async function(dispatch){
      const res = await axios.get(`${url}getAllWaiters`)
      return dispatch({ type: GET_ALL_USERS, payload: res.data})
    }
}



export function getUserById(id){
    return async function(dispatch){
      const res = await axios.post(`${url}getWaiterById/${id}`)
      return dispatch({ type: GET_USER_BY_ID, payload: res.data})
    }
}


export function cancelar(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}updateStatusOrder`, payload)
      return dispatch({ type: CANCEL, payload: res.data})
    }
}

export function updateStatusOrder(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}updateStatusOrder`, payload)
    }
}

export function getOrdersByDate(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}getOrderByDate`, payload)
      return dispatch({ type: GET_ORDERS_BY_DATE, payload: res.data})
    }
}

// export function filterOrders(payload){
//     return async function(dispatch){
//       const res = await axios.post(`${url}filter`, payload)
//       return dispatch({ type: FILTER_ORDERS, payload: res.data})
//     }
// }

export function filterOrders (value){
    return{
        type: FILTER_ORDERS,
        payload: value
    }
} 



export function addItemToOpenTable(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}updateComanda`, payload)
    
    }
}

export function findProduct(payload){
    return async function(dispatch){
      
        if(payload){
            const res = await axios.post(`${url}findProduct`, payload)
            return dispatch({ type: FIND_PRODUCT, payload: res.data})
        } else{
            const res = await axios.post(`${url}findProduct`)
            return dispatch({ type: FIND_PRODUCT, payload: res.data})
        }  
    }
}

export function updateStatusOrderInConfirm(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}updateStatusOrder`, payload)
      return dispatch({ type: UPDATE_STATUS_ORDER_IN_CONFIRM, payload: res.data})
    }
}

export function createComanda(payload){
    return async function(dispatch){
      const res = await axios.post(`${url}createcomanda`, payload)
   
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

export function addClient (value){
    return{
        type: ADD_CLIENT,
        payload: value
    }
}


export function emptyDetails (){

    return{
        type: EMPTY_DETAILS,
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

export const resetCart = () => {
    return{
        type: RESET_CART
    }
}

export function sustractItem(value){
   
    return{
        type:SUSTRACT_TO_CART,
        payload: value
    }
}

export function DeleteItem(value){
    
    return{
        type:DELETE_ITEM,
        payload: value
    }
}

export function addItem(value){
    return{
        type:ADD_ITEM_TO_CART,
        payload: value
    }
}

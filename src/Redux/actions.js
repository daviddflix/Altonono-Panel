import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
export const CREDENTIAL = 'CREDENTIAL'
export const  ADD_ORDERS = 'ADD_ORDER'
export const  RESET = 'RESET'
export const  GET_DETAILS = 'GET_DETAILS'
export const  STATUS = 'STATUS'
export const  CANCEL = 'CANCEL'
export const  PRODUCTS = 'PRODUCTS'
export const  SET_STATUS_FOOD = 'SET_STATUS_FOOD'

const axios = require('axios').default;

const url = process.env.REACT_APP_URL



export function accessAdmin (payload){
    
     const admin = {mail: 'altonono@gmail.com', password: '234567' }
     const dataAdmin = Object.values(admin) 
     const dataPayload = Object.values(payload)
     const cookies = new Cookies()
    return function(dispatch){
          try {
            if(JSON.stringify(dataAdmin) === JSON.stringify(dataPayload)){
                                dispatch({ type: CREDENTIAL, payload: true});
                                cookies.set('mail', payload.mail, {path: '/'})
                                cookies.set('password', payload.password, {path: '/'})
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                  
                                  })
                            }
          } catch (error) {
              console.log('errorAdmin', error)
          }
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

 

 export function getTienda(data){
     return async function(dispatch){
       const res = await axios.post(`${url}online?status=${data}`)
       return dispatch({ type: STATUS, payload: data})
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
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
export const CREDENTIAL = 'CREDENTIAL'
export const  ADD_ORDERS = 'ADD_ORDER'
export const  RESET = 'RESET'
export const  GET_DETAILS = 'GET_DETAILS'
export const  STATUS = 'STATUS'

const axios = require('axios').default;

const url = 'https://altonono.herokuapp.com/'



export function accessAdmin (payload){
     console.log(payload)
     const admin = {mail: 'altonono@gmail.com', password: '123456'}
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

 

 export function getTienda(data){
     return async function(dispatch){
       const res = await axios.post(`${url}online?status=${data}`)
       console.log('status store', res.data)
       return dispatch({ type: STATUS, payload: data})
     }
 }
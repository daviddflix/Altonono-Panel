import swal from 'sweetalert'
import Cookies from 'universal-cookie';
export const GET_USERS = 'GET_USERS'
export const CREDENTIAL = 'CREDENTIAL'
export const PAYMENT_DETAIL = 'PAYMENT_DETAIL'
export const PASSANGERS = 'PASSANGERS'

export const  GET_All_PAGOS = 'GET_All_PAGOS'
export const  GET_All_USERS = 'GET_All_USERS'
const axios = require('axios').default;

const url = 'https://hit-pasta.herokuapp.com/'

export function getAllPagos (){
    return async function (dispatch){
       try {
            const res = await axios.get(`${url}getallpagos`);
            return dispatch({ type: GET_All_PAGOS, payload: res.data });
        } catch (err) {
            return console.error('error EN PAGOS',err);
        }
            
    } 
 
 
}

export function getAllUsers (){
    return async function (dispatch){
       try {
            const res = await axios.get(`${url}getuser`);
            return dispatch({ type: GET_All_USERS, payload: res.data });
        } catch (error) {
            return console.error('error EN getAllUsers',error);
        }
            
    } 
 
 
}


export function getUsers (){
       return async function (dispatch){
          try {
               const res = await axios.get('https://deviaje.herokuapp.com/getusers');
               return dispatch({ type: GET_USERS, payload: res.data });
           } catch (err) {
               return console.error('error',err);
           }
               
       } 
    
    
 }


export function accessAdmin (payload){
     console.log(payload)
     const admin = {mail: 'deviajepuntocom12@gmail.com', password: '123456'}
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
                                swal('Wrong Credentials')
                            }
          } catch (error) {
              console.log('errorAdmin', error)
          }
    }
}

export function paymentDetail(){
    return async function (dispatch){
        try {
            fetch('https://deviaje.herokuapp.com/getclientdetails')
            .then(res => res.json())
            .then(data => dispatch({type: PAYMENT_DETAIL, payload: data}))
        } catch (error) {
            console.log('errorpayment', error)
        }
    } 
}

export function getPassangers(payload){
    return async function (dispatch){
        try {
            if(payload){
                fetch(`https://deviaje.herokuapp.com/searchPassengers?name=${payload}`)
                .then(res => res.json())
                .then(data => dispatch({type: PASSANGERS, payload: data}))
            } else{
                fetch(`https://deviaje.herokuapp.com/searchPassengers`)
                .then(res => res.json())
                .then(data => dispatch({type: PASSANGERS, payload: data}))
            }
           
        } catch (error) {
            console.log('errorpassangers', error)
    } 
}
}





  // fetch('https://deviaje.herokuapp.com/createAdmin')
        // .then(res => res.json())
        // .then(data => {
        //     const datapay = Object.values(payload) 
        //     const creds = Object.values(data)
           
        //     if(JSON.stringify(creds) === JSON.stringify(datapay)){
        //         dispatch({ type: CREDENTIAL, payload: true});
    
        //     } else {
        //         swal('Wrong Credentials')
        //     }
        // })

        // try{
        //     if(JSON.stringify(dataAdmin) === JSON.stringify(dataPayload)){
        //                 dispatch({ type: CREDENTIAL, payload: true});
        //             } else {
        //                 swal('Wrong Credentials')
        //             }
        //     }
        //     catch(err => {
        //         console.log('errorAdmin', err)
        //     })
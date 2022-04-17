import swal from 'sweetalert'

export const GET_USERS = 'GET_USERS'
export const CREDENTIAL = 'CREDENTIAL'
export const PAYMENT_DETAIL = 'PAYMENT_DETAIL'
const axios = require('axios').default;


export function getUsers (){
       return async function (dispatch){
          try {
               const res = await axios.get('https://deviaje.herokuapp.com/getusers');
               console.log('res',res)
               return dispatch({ type: GET_USERS, payload: res.data });
           } catch (err) {
               return console.error('error',err);
           }
               
       } 
    
    
 }


//  export function accessAdmin (payload){
//     return async function (dispatch){
//         console.log('payload createAdmin',payload)
//        try {
//             const res = await axios.get('http://localhost:4001/createAdmin');
//             const creds = res.data
          
//             if(JSON.stringify(creds) === JSON.stringify(payload)){
//                 dispatch({ type: CREDENTIAL, payload: true});
//             } else {
//                 return false
//             }
//         } catch (err) {
//             return console.error('errorAdmin',err);
//         }
            
//     } 
 
 
// }

export function accessAdmin (payload){
   
    return function(dispatch){
        fetch('https://deviaje.herokuapp.com/createAdmin')
        .then(res => res.json())
        .then(data => {
            const datapay = Object.values(payload) 
            const creds = Object.values(data)
           
            if(JSON.stringify(creds) === JSON.stringify(datapay)){
                dispatch({ type: CREDENTIAL, payload: true});
    
            } else {
                swal('Wrong Credentials')
            }
        })
        .catch(err => {
            console.log('errorAdmin', err)
        })
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

//  export function getAll (){
//   return async function (dispatch){
//          try {
//               const res = await axios.get(`http://localhost:3001/countries`);
//               return dispatch({ type: GET_All, payload: res.data });
//           } catch (err) {
//               return console.error(err);
//           }
              
//       } 
   
   
// } 

 

//  export function postAcitvity (nombre, dificultad, duracion, temporada, countries){
  
//           try {
//                const res =  axios.post(`http://localhost:3001/activity`, {
//                   nombre, dificultad, duracion, temporada, countries
//                });
//                 return res
//            } catch (err) {
//                return console.error(err);
//            }
               
       
    
    
//  } 


//  export function filterByContinent(value){
//      return{
//          type:FILTER_CONTINENT,
//          payload: value
//      }
//  }
 
//  export function filterByPopulation(value){
//      return{
//        type: FILTER_POPULATION,
//        payload: value
//      }
//  }

//  export function filterAz(value){
//      return{
//          type: FILTERAZ,
//          payload: value
//      }
//  }




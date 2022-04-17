import { CREDENTIAL, GET_USERS, PAYMENT_DETAIL } from "./actions"

const InicialState ={
    payments: [],
    users:[],
    admin: ''
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {
         case GET_USERS:
             return{
                 ...state,
                 users: action.payload
             }

         case CREDENTIAL: 
             return{
                 ...state,
                 admin: action.payload
             }

         case PAYMENT_DETAIL:
             return{
                 ...state,
                 payments: action.payload
             }
     
         default:
             return {...state};
     }

}

export default rootReducer
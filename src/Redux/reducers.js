import { CREDENTIAL, GET_USERS, PASSANGERS, PAYMENT_DETAIL } from "./actions"

const InicialState ={
    payments: [],
    users:[],
    admin: '',
    passangers: []
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

        case PASSANGERS:
            return{
                ...state,
                passangers: action.payload
            }
     
         default:
             return {...state};
     }

}

export default rootReducer
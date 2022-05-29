import { GET_All_PAGOS, CREDENTIAL, GET_All_USERS } from "./actions"

const InicialState ={
    pagos: [],
    admin: '',
    users: []
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {
         case GET_All_PAGOS:
             return{
                 ...state,
                 pagos: action.payload
             }
        case CREDENTIAL:
        return{
            ...state,
            admin: action.payload
        }

        case GET_All_USERS:
            return{
                ...state,
                users: action.payload
            }

     
         default:
             return {...state};
     }

}

export default rootReducer
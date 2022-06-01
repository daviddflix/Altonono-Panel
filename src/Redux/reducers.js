import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, CREDENTIAL, RESET } from "./actions"

const InicialState ={
    admin: false,
    pedidos: []
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {
         case ADD_ORDERS:
             return{
                 ...state,
                 pedidos: [...state.pedidos, action.payload]
             }
        case CREDENTIAL:
        return{
            ...state,
            admin: action.payload
        }
    
        case RESET:
            storage.removeItem('persist:root')
            return{
                admin: false,
            }

     
         default:
             return {...state};
     }

}

export default rootReducer
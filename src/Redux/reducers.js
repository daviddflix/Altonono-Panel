import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, CREDENTIAL, GET_DETAILS, RESET } from "./actions"

const InicialState ={
    admin: false,
    pedidos: [],
    detalle : {}
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {

         case ADD_ORDERS:
             return{
                 ...state,
                 pedidos: !state.pedidos ?[ action.payload] : state.pedidos.concat(action.payload)
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

        case GET_DETAILS:
            
            return{
                ...state,
                detalle: action.payload,
            }

     
         default:
             return {...state};
     }

}

export default rootReducer
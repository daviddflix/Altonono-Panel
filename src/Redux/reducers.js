import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, CANCEL, CREDENTIAL, GET_DETAILS, RESET, SET_STATUS_FOOD, STATUS } from "./actions"


const InicialState ={
    admin: false,
    pedidos: [],
    detalle : {},
    status: 'offline',
    statusFood: ''
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {

         case ADD_ORDERS:
             return{
                 ...state,
                 pedidos: !state.pedidos ?[ action.payload] : state.pedidos.concat(action.payload)
             }
        case CREDENTIAL:
            console.log('key', Object.values(window.localStorage))
        return{
            ...state,
            admin: action.payload
        }
    
        case RESET:
           
            storage.removeItem('persist:root')
            return{
                admin: false,
                status: 'offline'
            }
            case STATUS:
            
            return{
                ...state,
                status: action.payload
            }

        case GET_DETAILS:
            
            return{
                ...state,
                detalle: action.payload,
            }

        case CANCEL:
            const filter = state.pedidos.filter(p => p.id !== action.payload)
                return{
                    ...state,
                    pedidos: filter,
                }

        case SET_STATUS_FOOD:
          
                return{
                    ...state,
                    statusFood: action.payload,
                }
        

     
         default:
             return {...state};
     }

}

export default rootReducer
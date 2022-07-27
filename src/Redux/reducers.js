import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, CANCEL, CREDENTIAL, GET_DETAILS, PRODUCTS, RESET, STATUS } from "./actions"


const InicialState ={
    admin: false,
    queue: [],
    confirmOrder: [],
    cancelOrder: [],
    detalle : {},
    status: 'offline',
    products: []
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {

         case ADD_ORDERS:

             return{
                 ...state,
                 queue: [...state.queue, action.payload]
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
                status: 'offline',
                queue: [],
                confirmOrder: [],
                cancelOrder: [],
                detalle : {},
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
           
          
            const itemInQueue = state.queue.filter(p => p.id === action.payload)
            const itemInConfirm = state.confirmOrder.filter(p => p.id === action.payload)

          
        if(itemInQueue.length>0){
            return{
                ...state,
                queue: state.queue.filter(p => p.id !== action.payload),
                cancelOrder: [...state.cancelOrder, itemInQueue[0]]
              
            }
        } 
        if(itemInConfirm.length>0){
            console.log('here')
            return{
                ...state,
                confirmOrder: state.confirmOrder.filter(p => p.id !== action.payload),
                cancelOrder: [...state.cancelOrder, itemInConfirm[0]]
            }
        }
        break

        case PRODUCTS: 

                return{
                    ...state,
                    products: action.payload,
                }
        

     
         default:
             return {...state};
     }

}

export default rootReducer
import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, ALL_ORDERS, CANCEL, CARD_STATUS_DELIVERY, CREDENTIAL, GET_DETAILS, PRODUCTS, RESET, SET_CRONO, SET_STATUS_FOOD, STATUS, UPDATE_STATUS_STORE } from "./actions"


const InicialState = {
    admin: false,
    queue: [],
    confirmOrder: [],
    cancelOrder: [],
    allOrders: [],
    detalle : {},
    status: 'offline',
    products: [],
    cardStatusDelivery: [],
    crono: []
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
                cardStatusDelivery: [],
                allOrders: [],
                products: [],
                crono: []
            }
            case STATUS:
            
            return{
                ...state,
                status: action.payload
            }

            case UPDATE_STATUS_STORE:
            
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
           
           console.log('action', action.payload)
            const itemInQueue = state.queue.filter(p => p.id === action.payload.detalle.id)
            const itemInConfirm = state.confirmOrder.filter(p => p.id === action.payload.detalle.id)

          
        if(itemInQueue.length>0){
            return{
                ...state,
                queue: state.queue.filter(p => p.id !== action.payload.detalle.id),
                cancelOrder: [...state.cancelOrder, action.payload],
                allOrders: [...state.allOrders, action.payload]
              
            }
        } 
        if(itemInConfirm.length>0){
           
            return{
                ...state,
                confirmOrder: state.confirmOrder.filter(p => p.id !== action.payload.detalle.id),
                cancelOrder: [...state.cancelOrder, action.payload],
                allOrders: [...state.allOrders, action.payload]
            }
        }
        break

        case PRODUCTS: 

                return{
                    ...state,
                    products: action.payload,
                }

        case SET_STATUS_FOOD: 

        const found = state.queue.filter(p => p.id === action.payload.id)

        if(found){
            return{
                ...state,
                queue: state.queue.filter(p => p.id !== action.payload.id),
                confirmOrder: [...state.confirmOrder, action.payload]
              }
        }
        break

        case CARD_STATUS_DELIVERY: 

           return{
            ...state,
            cardStatusDelivery: [...state.cardStatusDelivery, action.payload]
           }

        case ALL_ORDERS: 
            return{
               ...state,
               confirmOrder:  state.confirmOrder.filter(p => p.id !== action.payload.detalle.id),
               allOrders: [...state.allOrders, action.payload],

            }

       case SET_CRONO: 
         
        const obj = state.crono.find(p => p.id === action.payload.id)

        if(obj){
            return{
              ...state,
              crono: state.crono.map(item => item.id === action.payload.id? {
                ...item,
                timer: item.timer + 1
              }: item)
            }
          }

          return{
            ...state,
            crono: [...state.crono, action.payload]
            
          }
         default:
             return {...state};
     }

}

export default rootReducer
import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, ALL_ORDERS, ALL_ORDERS_DASH, CANCEL, CARD_STATUS_DELIVERY, CREDENTIAL, EMPTY_ALL_ORDERS, EMPTY_DETAILS, GET_ALL_ORDERS, GET_DETAILS, GET_ORDERS_BY_DATE, GET_PRODUCT_BY_ID, PRODUCTS, RESET, SET_CRONO, STATUS, UPDATE_LOGIN, UPDATE_STATUS_ORDER, UPDATE_STATUS_ORDER_IN_CONFIRM, UPDATE_STATUS_ORDER_IN_QUEUE, UPDATE_STATUS_STORE } from "./actions"


const InicialState = {
    isLogin: false,
    admin: [],
    queue: [],
    confirmOrder: [],
    allOrders: [],
    allOrdersdash: [],
    detalle : {},
    status: [],
    products: [],
    cardStatusDelivery: [],
    crono: [],
    productByid: {}
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

        case UPDATE_LOGIN:
            return{
                ...state,
                isLogin: action.payload
            }
    
        case RESET:
           
            storage.removeItem('persist:root')
            return{
                isLogin: false,
                admin: [],
                status: [],
                queue: [],
                confirmOrder: [],
                detalle : {},
                cardStatusDelivery: [],
                allOrders: [],
                allOrdersdash: [],
                products: [],
                crono: [],
                productByid: {}
            }
            case STATUS:
            
            return{
                ...state,
                status: action.payload
            }

            case UPDATE_STATUS_STORE:

             const newState = action.payload.filter(p => p != null)
            
                return{
                    ...state,
                    status: newState
                }

          
        case GET_DETAILS:
            
            return{
                ...state,
                detalle: action.payload,
            }

            case ALL_ORDERS_DASH:
            
                return{
                    ...state,
                    allOrdersdash: action.payload,
                }

            case GET_ALL_ORDERS:
            
                return{
                    ...state,
                    allOrders: action.payload
                }

         case GET_PRODUCT_BY_ID:

        return{
            ...state,
            productByid: action.payload
        }

         case EMPTY_DETAILS:

            return{
                ...state,
                detalle: {},
                productByid: {}
            }

        case CANCEL:

            const updatedOrder = action.payload[1]

           
            const itemInQueue = state.queue.filter(p => p.id === updatedOrder.id)
            const itemInConfirm = state.confirmOrder.filter(p => p.id === updatedOrder.id)

          
        if(itemInQueue.length>0){
            return{
                ...state,
                queue: state.queue.filter(p => p.id !== updatedOrder.id),
              
            }
        } 
        if(itemInConfirm.length>0){
           
            return{
                ...state,
                confirmOrder: state.confirmOrder.filter(p => p.id !== updatedOrder.id),
            }
        }
        break

        case PRODUCTS: 

                return{
                    ...state,
                    products: action.payload,
                }

        case UPDATE_STATUS_ORDER_IN_QUEUE: 

        const updatedOrde = action.payload[1]

        const found = state.queue.filter(p => p.id === updatedOrde.id)

        if(found){
            return{
                ...state,
                queue: state.queue.filter(p => p.id !== updatedOrde.id),
                confirmOrder: [...state.confirmOrder, updatedOrde]
              }
        }
        break

        case UPDATE_STATUS_ORDER_IN_CONFIRM: 

        const updatedOrderinConfirm = action.payload[1]

        const foundOrder = state.confirmOrder.filter(p => p.id === updatedOrderinConfirm.id)

        if(foundOrder){
            return{
                ...state,
                confirmOrder: state.confirmOrder.filter(p => p.id !== updatedOrderinConfirm.id),
              }
        }
        break

        case CARD_STATUS_DELIVERY: 

           return{
            ...state,
            cardStatusDelivery: [...state.cardStatusDelivery, action.payload]
           }

           case GET_ORDERS_BY_DATE: 

           return{
            ...state,
            allOrders: action.payload
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
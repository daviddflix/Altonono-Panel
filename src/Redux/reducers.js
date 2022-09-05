import storage from "redux-persist/lib/storage"
import { ADD_ITEM_TO_CART, ADD_ORDERS, ALL_ORDERS, CANCEL, CARD_STATUS_DELIVERY, CREDENTIAL, EMPTY_DETAILS, FILTER_ORDERS, FIND_PRODUCT, GET_ALL_ORDERS, GET_ALL_USERS, GET_DETAILS, GET_ORDERS_BY_DATE, GET_PRODUCT_BY_ID, GET_USER_BY_ID, ORDER_OF_THE_DAY, PRODUCTS, RESET, RESET_CARD, RESET_CART, SET_CRONO, STATUS, SUSTRACT_TO_CART, UPDATE_LOGIN, UPDATE_STATUS_ORDER_IN_CONFIRM, UPDATE_STATUS_STORE } from "./actions"


const InicialState = {
    isLogin: false,
    admin: [],
    queueOfTheDay: [],
    allOrders: [],
    allOrders_2: [],
    detalle : {}, 
    status: [],
    products: [],
    productsInComanda: [],
    cardStatusDelivery: [],
    crono: [],
    productByid: {},
    users: [],
    userById: [],
    cart: [],
  
}


 const rootReducer = (state = InicialState, action) => {
    
     switch (action.type) {

         case ADD_ORDERS:

             return{
                 ...state,
                queueOfTheDay: [...state.queueOfTheDay, action.payload]
             }

         case ORDER_OF_THE_DAY:

             return{
                 ...state,
                 queueOfTheDay: action.payload
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

        case RESET_CART:
            return{
                ...state,
                cart: []
            }
    
        case RESET:
           
            storage.removeItem('persist:root')
            return{
                isLogin: false,
                admin: {},
                status: [],
                queueOfTheDay: [],
                detalle : {},
                cardStatusDelivery: [],
                allOrders: [],
                allOrders_2: [],
                products: [],
                crono: [],
                productByid: {},
                users: [],
                userById: [],
                cart: [],
                productsInComanda: []
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

        case ADD_ITEM_TO_CART: 
            
            const find = state.cart.find( p => p.id === action.payload.id)
     
            if(find){
            return {
                ...state,
                cart: state.cart.map(p => p.id === action.payload.id? {
                    ...p, quantity : p.quantity + 1
                }: p)
            }
            }
            
        
            return{
            ...state,
            cart:[...state.cart, action.payload]
            
            }

            case SUSTRACT_TO_CART:

                const findItem = state.cart.find( p => p.id === action.payload.id)
    
                if(findItem && findItem.quantity > 1){
                  return {
                    ...state,
                     cart: state.cart.map(p => p.id === action.payload.id? {
                       ...p, quantity : p.quantity - 1
                     }: p)
                  }
                }
                if(findItem && findItem.quantity === 1){
                 return {
                   ...state,
                    cart: state.cart.filter(p => p.id !== action.payload.id) 
                 }
               }
                if(!findItem) {
                return {
                    ...state,
                  }
               }
                
             break

            case GET_ALL_ORDERS:
            
                return{
                    ...state,
                    allOrders: action.payload
                }
            case FIND_PRODUCT:
            
                return{
                    ...state,
                    productsInComanda: action.payload
                }

            case GET_USER_BY_ID:
            
                return{
                    ...state,
                    userById: action.payload
                }

         case GET_PRODUCT_BY_ID:

        return{
            ...state,
            productByid: action.payload
        }

         case GET_ALL_USERS:

        return{
            ...state,
            users: action.payload
        }

         case EMPTY_DETAILS:

            return{
                ...state,
                detalle: {},
                productByid: {}
            }

        case CANCEL:

            const updatedOrder = action.payload[1]

           
            const itemInQueue = state.queueOfTheDay.filter(p => p.id === updatedOrder.id)
           

          
        if(itemInQueue.length>0){
            return{
                ...state,
                queueOfTheDay: state.queueOfTheDay.filter(p => p.id !== updatedOrder.id),
              
            }
        } 
        
        break

        case PRODUCTS: 

                return{
                    ...state,
                    products: action.payload,
                }

        case UPDATE_STATUS_ORDER_IN_CONFIRM: 

        const updatedOrderinConfirm = action.payload[1]

        const foundOrder = state.queueOfTheDay.filter(p => p.id === updatedOrderinConfirm.id)

        if(foundOrder){
            return{
                ...state,
                queueOfTheDay: state.queueOfTheDay.filter(p => p.id !== updatedOrderinConfirm.id),
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
            allOrders: action.payload,
            allOrders_2: action.payload
           }

        case ALL_ORDERS: 
     
            return{
               ...state,
               allOrders: [...state.allOrders, action.payload],

            }

        case FILTER_ORDERS: 

          if(action.payload === 'QR' || action.payload === 'Efectivo'){

            const filterMethod = state.allOrders_2.filter(p => p.method === action.payload)
            return{
                ...state,
                allOrders:filterMethod,
             }
          }

          if(action.payload === 'cancelado' || action.payload === 'Mesa Abierta'){

            const filterStatus = state.allOrders_2.filter(p => p.status === action.payload)
            return{
                ...state,
                allOrders:filterStatus,
             }
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
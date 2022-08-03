import storage from "redux-persist/lib/storage"
import {ADD_ORDERS, ALL_ORDERS, CANCEL, CARD_STATUS_DELIVERY, CREDENTIAL, EMPTY_DETAILS, GET_DETAILS, GET_PRODUCT_BY_ID, PRODUCTS, RESET, SET_CRONO, SET_STATUS_FOOD, STATUS, UPDATE_ITEM, UPDATE_LOGIN, UPDATE_STATUS_STORE } from "./actions"


const InicialState = {
    isLogin: false,
    admin: [],
    queue: [],
    confirmOrder: [],
    cancelOrder: [],
    allOrders: [],
    detalle : {},
    status: [],
    products: [],
    cardStatusDelivery: [],
    crono: [],
    statusbtn: [],
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
                cancelOrder: [],
                detalle : {},
                cardStatusDelivery: [],
                allOrders: [],
                products: [],
                crono: [],
                statusbtn: [],
                productByid: {}
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

            case UPDATE_ITEM: 

            const ob = state.statusbtn.find(p => p.id === action.payload.id);

            if(ob){
                return{
                  ...state,
                  statusbtn: state.statusbtn.map(item => item.id === action.payload.id? {
                    ...item,
                    available: action.payload.available
                  }: item)
                }
              
              }
             
              return{
                ...state,
                statusbtn: [...state.statusbtn, action.payload]
             }

            
        case GET_DETAILS:
            
            return{
                ...state,
                detalle: action.payload,
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
        console.log('order', action.payload)
        console.log('allOrder', state.allOrders)
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
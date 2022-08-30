import s from './dashboard.module.css'
import { useContext, useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import ModalContext from '../../context/modalContext'
import {BsReceiptCutoff} from 'react-icons/bs'
import {IoCloseCircleSharp} from 'react-icons/io5'
import {GiReceiveMoney} from 'react-icons/gi'
import {FaAward} from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import {  getAllOrders, getAllOrdersOfTheDay, getAllOrdersToDash, getStatus } from '../../Redux/actions';
import moment from 'moment'

export default function Dashboard(){

  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.queueOfTheDay);
  const allOrders = useSelector(state => state.allOrders);
 
console.log('orders', orders)

 useEffect(() => {
    dispatch(getAllOrdersOfTheDay())
   }, [dispatch])

   useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  useEffect(() => {
    dispatch(getStatus())
  }, [dispatch])

  const totalOrdersLengthByDay = orders.length > 0 ? orders.filter(p => p.status === "Pedido Finalizado").length : 0
  const OrdersCancel = orders.length > 0 ? orders.filter(p => p.status === "cancelado").length : 0


 
  const arrayOfTotalOrder = orders.length > 0 ? orders.map(p => p.monto) : 0

  const total = arrayOfTotalOrder === 0 ? 0 : arrayOfTotalOrder.reduce((a,b) => a + b, 0);
  
 
  const {variables} = useContext(ModalContext);
  const windowlength = window.matchMedia("(max-width:700px)")

useEffect(() => {
     document.title = 'Dashboard'
})

const styles = {
   length : {
       width: 'calc(100vw - 80px)',
       position: 'relative',
       left: '80px'
   },
   moreLength: {
       width: 'calc(100vw - 200px)',
       position: 'relative',
       left: '200px'
   },
   less: {
      width : '100vw'
   }
 }

   return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less}  className={s.main}>
            <div className={s.maincontainer}> 
              <h1 className={s.title}>Dashboard</h1>
              <div className={s.box1}>
                  <div onClick={() => history.push('/resume')} className={s.box2}>
                     <BsReceiptCutoff className={s.iconOrder}/>
                     <div className={s.subBox}>
                       <h1>{totalOrdersLengthByDay}</h1>
                       <h4>Pedidos del dia</h4>
                     </div>
                     
                  </div>
                  <div className={s.box2}>
                  <IoCloseCircleSharp className={s.iconRechazados}/>
                     <div className={s.subBox}>
                       <h1>{OrdersCancel}</h1>
                       <h4>Pedidos Rechazados del dia</h4>
                     </div>
                  </div>
                  <div className={s.box2}>
                     <GiReceiveMoney className={s.iconRecaudacion}/>
                     <div className={s.subBox}>
                       <h1><CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h1>
                       <h4>Recaudacion del dia</h4>
                     </div>
                  </div>
                  <div className={s.box2}>
                  <FaAward className={s.iconOrder}/>
                     <div className={s.subBox}>
                       <h1>{allOrders.length}</h1>
                       <h4>Total pedidos</h4>
                     </div>
                  </div>
              </div>
            </div>
        </div>
      )
}   


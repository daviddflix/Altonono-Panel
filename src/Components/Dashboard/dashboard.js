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
import {  getAllOrdersToDash } from '../../Redux/actions';
import moment from 'moment'

export default function Dashboard(){

  const history = useHistory();
  const dispatch = useDispatch()
  const pedidos = useSelector(state => state.allOrdersdash);
  const date = moment().format('l')
console.log(pedidos)

  useEffect(() => {
    dispatch(getAllOrdersToDash())
  }, [])



  const totalOrdersLength = pedidos === 'no hay pedidos' || pedidos === "No hay productos para la fecha seleccionada" ? 0 : pedidos.filter(p => p.status !== 'cancelado').length
  const totalOrders = pedidos === 'no hay pedidos' || pedidos === "No hay productos para la fecha seleccionada" ? 0 : pedidos.filter(p => p.status !== 'cancelado')
  const OrdersCancel = pedidos === 'no hay pedidos' || pedidos === "No hay productos para la fecha seleccionada" ? 0 : pedidos.filter(p => p.status === 'cancelado').length


  const totalOrdersLengthByDay = totalOrders === 0 ? 0 : totalOrders.filter(p => p.date === date).length
  const totalOrdersByDay = totalOrders === 0 ? 0 : totalOrders.map(p => p.monto)

  const total = totalOrdersByDay === 0 ? 0 : totalOrdersByDay.reduce((a,b) => a + b, 0);
  
 
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
                       <h4>Pedidos Rechazados</h4>
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
                       <h1>{totalOrdersLength}</h1>
                       <h4>Total pedidos</h4>
                     </div>
                  </div>
              </div>
            </div>
        </div>
      )
}   


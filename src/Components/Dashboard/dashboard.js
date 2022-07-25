import s from './dashboard.module.css'
import { useContext, useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import ModalContext from '../../context/modalContext'
import {BsReceiptCutoff} from 'react-icons/bs'
import {IoCloseCircleSharp} from 'react-icons/io5'
import {GiReceiveMoney} from 'react-icons/gi'
import {FaAward} from 'react-icons/fa'

export default function Dashboard(){

  const dispatch = useDispatch();
  const rejected = useSelector(state => state.cancelOrder);
  const pedidos = useSelector(state => state.confirmOrder);
  const amount = pedidos? pedidos.map(p => p.monto): 0;
  const total = amount.length? amount.reduce((a,b) => a + b, 0) : 0;
  const {variables} = useContext(ModalContext);
  const windowlength = window.matchMedia("(max-width:600px)")

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
                  <div className={s.box2}>
                     <BsReceiptCutoff className={s.iconOrder}/>
                     <div className={s.subBox}>
                       <h1>{pedidos.length}</h1>
                       <h4>Pedidos del dia</h4>
                     </div>
                  </div>
                  <div className={s.box2}>
                  <IoCloseCircleSharp className={s.iconRechazados}/>
                     <div className={s.subBox}>
                       <h1>{rejected.length}</h1>
                       <h4>Pedidos Rechazados</h4>
                     </div>
                  </div>
                  <div className={s.box2}>
                     <GiReceiveMoney className={s.iconRecaudacion}/>
                     <div className={s.subBox}>
                       <h1>${total}</h1>
                       <h4>Recaudacion</h4>
                     </div>
                  </div>
                  <div className={s.box2}>
                  <FaAward className={s.iconOrder}/>
                     <div className={s.subBox}>
                       <h1>Sin datos</h1>
                       <h4>Producto mas vendido</h4>
                     </div>
                  </div>
              </div>
            </div>
        </div>
      )
}   


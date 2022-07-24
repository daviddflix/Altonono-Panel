import s from './dashboard.module.css'
import { useContext, useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import ModalContext from '../../context/modalContext'

export default function Dashboard(){

  const dispatch = useDispatch();
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
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h1 className={s.title}>Dashboard</h1>
              
              </div>     
                
               <div className={s.box1}>
               <h3 className={s.box_title}>At a Glance</h3>
                  <div className={s.insidebox}>


                  <div className={s.graphbox}>
                     <div className={s.graph}>
                     <span className={s.graphTitle}>Total</span>
                    <CurrencyFormat className={s.index} value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>

                     <div className={s.graph}>
                     <span className={s.graphTitle}>Total Pedidos</span>
                     <p className={s.index}>{pedidos? pedidos.length : 0}</p>
                    </div>

                  </div>
                  </div>
               </div>
            </div>
        </div>
      )
}   


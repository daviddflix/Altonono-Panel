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
  const {toggle, setToggle} = useContext(ModalContext)

useEffect(() => {
     document.title = 'Dashboard'
})

   return(
        <div style={toggle === false? {width: '82%', left: '18%'}: {width: '92.8%', left: '7%' }} className={s.main}>
             
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


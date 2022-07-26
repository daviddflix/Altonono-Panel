import { useEffect} from 'react'
import s from './order.module.css'
import {  useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import ModalContext from '../../context/modalContext';



export default function Pedidos(){

    const pedidos = useSelector(state => state.confirmOrder)
      
    useEffect(() => {
        document.title = 'Resumen Pedidos'
   })

   const {variables} = useContext(ModalContext);
   const windowlength = window.matchMedia("(max-width:700px)")

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
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
          <div className={s.container}>
              <h1 className={s.title}>Resumen del Pedido</h1>
              <div className={s.grid}>
                <h4 className={s.width}>Hora</h4>
                <h4 className={s.width}>Cliente</h4>
                <h4 className={s.width}>Mesa</h4>
                <h4 className={s.width}>Metodo</h4>
                <h4 className={s.width}>Telefono</h4>
                <h4 className={s.width}>Total</h4>
                <h4 className={s.width}>Status</h4> 
              </div>
   
              <div className={s.subcontainer}>
              {
              pedidos?.map((p, i) => {
                return(
                  <Card
                  key={i}
                  id={p.id}
                  name={p.name}
                  table={p.table}
                  method={p.method}
                  telefono={p.telefono}
                  monto={p.monto}
                 
                  />
                )
              })    
            } 
              </div>      
          </div>
        </div>
    )
}


function Card({id, name, table, method, telefono, monto, statusFood}){

  const date = new Date();

  return( 
    <NavLink id='boxpedido'  className={s.boxpedido}  to={`/detail/${id}`}>
   
  <h4 className={s.width}>{`${date.getHours()}:${date.getMinutes()}`}</h4>
  <h4 className={s.width}>{name}</h4>
  <h4 className={s.width}>{table}</h4>
  <h4 className={s.width}>{method}</h4>
  <h4 className={s.width}>{telefono}</h4>
  <h4 className={s.width}><CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
  <h4 className={s.width}>Nuevo</h4>

  </NavLink>
  )
 
}



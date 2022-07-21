import { useEffect} from 'react'
import s from './order.module.css'
import {  useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format'
import { NavLink } from 'react-router-dom';



export default function Pedidos(){

    const pedidos = useSelector(state => state.confirmOrder)
      
    useEffect(() => {
        document.title = 'Resumen Pedidos'
   })
  
    return(
        <div  className={s.main}>
          <div className={s.container}>
              <h1 className={s.title}>Resumen del Pedido</h1>
              <div className={s.grid}>
                <h4>Hora</h4>
                <h4 >Cliente</h4>
                <h4 >Mesa</h4>
                <h4 >Metodo de Pago</h4>
                <h4>Telefono</h4>
                <h4>Total</h4>
                <h4>Status</h4> 
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
   
  <h4>{`${date.getHours()}:${date.getMinutes()}`}</h4>
  <h4>{name}</h4>
  <h4>{table}</h4>
  <h4>{method}</h4>
  <h4>{telefono}</h4>
  <h4><CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
  <h4>Nuevo</h4>

  </NavLink>
  )
 
}



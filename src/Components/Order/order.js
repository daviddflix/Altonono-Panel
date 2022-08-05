import { useEffect} from 'react'
import s from './order.module.css'
import {  useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format'
import {  useHistory } from 'react-router-dom';
import { useContext } from 'react';
import ModalContext from '../../context/modalContext';
import { emptyDetails } from '../../Redux/actions';
import {BiTask} from 'react-icons/bi'


export default function Pedidos(){

    const pedidos = useSelector(state => state.allOrders);
   
      
    useEffect(() => {
        document.title = 'Resumen Pedidos'
   })

   const {variables} = useContext(ModalContext);
   const windowlength = window.matchMedia("(max-width:700px)");


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
         {
          windowlength.matches === false?
          <div className={s.container}>
          <h1 className={s.title}>Resumen del Pedido</h1>
          <div className={s.grid}>
            <h4 className={s.width}>ID</h4>
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
            
            pedidos.length > 0 ?  pedidos?.map((p, i) => {
            return(
              <Card
              key={i}
              id={p.detalle.id}
              name={p.detalle.name}
              table={p.detalle.table}
              method={p.status === 'cancelado'? p.razon.value :p.detalle.method}
              telefono={p.detalle.telefono}
              monto={p.detalle.monto}
             statusFood={p.status}
              />
            )
          })  : <div className={s.containerNoOrder}>
          <BiTask className={s.iconCompleted}/>
          <h3 className={s.message}>Aqui se mostraran los pedidos completados</h3>
        </div>    
        } 
          </div>      
      </div>:
      <div className={s.container}>
      {
        <div className={s.maincontainer2}>
        {
          
          pedidos.length > 0 ? pedidos?.map((p, i) => {
          return(
            <Card2
            key={i}
            id={p.detalle.id}
            name={p.detalle.name}
            table={p.detalle.table}
            method={p.status === 'cancelado'? p.razon.value :p.detalle.method}
            telefono={p.detalle.telefono}
            monto={p.detalle.monto}
           statusFood={p.status}
            />
          )
        }) : <div className={s.containerNoOrder}>
          <BiTask className={s.iconCompleted}/>
          <h3 className={s.message}>Aqui se mostraran los pedidos completados</h3>
        </div>  
      } 
        </div>  
      }
      </div>

         }
        </div>
    )
}


function Card({id, name, table, method, telefono, monto, statusFood}){

  const date = new Date();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDetails = () => {
    dispatch(emptyDetails())
    history.push(`/detail/${id}`)
  }

  return( 
    <div id='boxpedido' onClick={handleDetails}  className={s.boxpedido}  >
   
  <h4 className={s.width}>#{id}</h4>
  <h4 className={s.width}>{`${date.getHours()}:${date.getMinutes()}`}</h4>
  <h4 className={s.width}>{name}</h4>
  <h4 className={s.width}>{table}</h4>
  <h4 className={s.width}>{method}</h4>
  <h4 className={s.width}>{telefono}</h4>
  <h4 className={s.width}><CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
  <h4 className={s.width}>{statusFood}</h4>

  </div>
  )
 
}

function Card2({id, name, table, method, telefono, monto, statusFood}){

  const date = new Date();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDetails = () => {
    dispatch(emptyDetails())
    history.push(`/detail/${id}`)
  }

   return(
    <div onClick={handleDetails}  className={s.card2MainBox}>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>ID</h4>
       <h4 className={s.card2Data}>#{id}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Hora</h4>
       <h4 className={s.card2Data}>{`${date.getHours()}:${date.getMinutes()}`}</h4>
      </div>
      <di className={s.card2Container}>
       <h4 className={s.card2Title}>Cliente</h4>
       <h4 className={s.card2Data}>{name}</h4>
      </di>
      <di className={s.card2Container}>
       <h4 className={s.card2Title}>Mesa</h4>
       <h4 className={s.card2Data}>{table}</h4>
      </di>
      <di className={s.card2Container}>
       <h4 className={s.card2Title}>Metodo</h4>
       <h4 className={s.card2Data}>{method}</h4>
      </di>
      <di className={s.card2Container}>
       <h4 className={s.card2Title}>Telefono</h4>
       <h4 className={s.card2Data}>{telefono}</h4>
      </di>
      <di className={s.card2Container}>
       <h4 className={s.card2Title}>Total</h4>
       <h4 className={s.card2Data}>{monto}</h4>
      </di>
      <di className={s.card2Container}>
       <h4 className={s.card2Title}>Status</h4> 
       <h4 className={statusFood=== 'cancelado'?s.statuscancel :s.status}>{statusFood}</h4>
      </di>   
    </div>
   )
}



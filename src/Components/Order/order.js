import { useEffect, useState} from 'react'
import s from './order.module.css'
import {  useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format'
import {  useHistory } from 'react-router-dom';
import { useContext } from 'react';
import ModalContext from '../../context/modalContext';
import { emptyDetails, getAllOrders, getOrdersByDate, getStatus } from '../../Redux/actions';
import {BiTask} from 'react-icons/bi'
import moment from 'moment'

export default function Pedidos(){

    const pedidos = useSelector(state => state.allOrders);
    const dispatch = useDispatch();


    const [date, setDate] = useState('');

  const handleDate = (e) => {
    setDate(e.target.value)
    const date = moment(e.target.value).format('l')
    dispatch(getOrdersByDate({date: date}))
  }
   
    useEffect(() => {
      dispatch(getAllOrders())
    }, [dispatch])
    
    useEffect(() => {
      dispatch(getStatus())
  }, [dispatch])

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

const totalOrders = pedidos === 'no hay pedidos' || pedidos === "No hay productos para la fecha seleccionada" ? 0 : pedidos.filter(p => p.status !== 'cancelado')
const filterTotal = totalOrders === 0 ? 0 : totalOrders.map(p => p.monto)
  const total = filterTotal === 0 ? 0 : filterTotal.reduce((a,b) => a + b, 0);
  
    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
         {
          windowlength.matches === false?
          <div className={s.container}>
          <div className={s.containertitle}>
          <h1 className={s.title}>Resumen del Pedido</h1>
          <input className={s.date}  value={date} onChange={handleDate} type='date'/>
          <CurrencyFormat className={s.total} value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
  
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
            pedidos === "no hay pedidos" || pedidos === "No hay productos para la fecha seleccionada"? <div className={s.containerNoOrder}>
            <BiTask className={s.iconCompleted}/>
            <h3 className={s.message}>No hay pedidos completados</h3>
          </div>  : pedidos?.map((p, i) => {
            return(
              <Card
              key={i}
              id={p.id}
              name={p.name}
              table={p.table}
              method={p.method}
              telefono={p.telefono}
              monto={p.monto}
             statusFood={p.status}
             time={p.time}
              />
            )
          })  
        } 
          </div>      
      </div>:
      <div className={s.container}>
      {
        <div className={s.maincontainer2}>
           <div className={s.containertitle}>
          <h1 className={s.title}>Resumen del Pedido</h1>
          <input className={s.date}  value={date} onChange={handleDate} type='date'/>
          <CurrencyFormat className={s.total} value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </div>
        {
          
          pedidos === 'no hay pedidos' || pedidos === 'No hay productos para la fecha seleccionada' ? <div className={s.containerNoOrder}>
          <BiTask className={s.iconCompleted}/>
          <h3 className={s.message}>No hay pedidos completados</h3>
        </div> : <div className={s.containerview}>
            {
              pedidos?.map((p, i) => {
                return(
                  <Card2
                  key={i}
                  id={p.id}
                  name={p.name}
                  table={p.table}
                  method={p.method}
                  telefono={p.telefono}
                  monto={p.monto}
                 statusFood={p.status}
                 time={p.time}
                  />
                )
              }) 
            }
        </div>
      } 
        </div>  
      }
      </div>

         }
        </div>
    )
}


function Card({id, name, table, method, telefono, monto, statusFood, time}){

  
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDetails = () => {
    dispatch(emptyDetails())
    history.push(`/detail/${id}`)
  }

  return( 
    <div id='boxpedido' style={statusFood === 'cancelado' ? {backgroundColor: '#ff595a'} : {backgroundColor: 'transparent'}} onClick={handleDetails}  className={s.boxpedido}  >
   
  <h4 className={s.width}>#{id}</h4>
  <h4 className={s.width}>{time.slice(0, 5)}</h4>
  <h4 className={s.width}>{name}</h4> 
  <h4 className={s.width}>{table}</h4>
  <h4 className={s.width}>{method}</h4>
  <h4 className={s.width}>{telefono}</h4>
  <h4 className={s.width}><CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
  <h4 className={s.width}>{statusFood === 'Pedido Listo'? 'En Preparacion': statusFood}</h4>

  </div>
  )
 
}

function Card2({id, name, table, method, telefono, monto, statusFood, time}){

  
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
       <h4 className={s.card2Data}>{time.slice(0, 5)}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Cliente</h4>
       <h4 className={s.card2Data}>{name}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Mesa</h4>
       <h4 className={s.card2Data}>{table}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Metodo</h4>
       <h4 className={s.card2Data}>{method}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Telefono</h4>
       <h4 className={s.card2Data}>{telefono}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Total</h4>
       <h4 className={s.card2Data}>{monto}</h4>
      </div>
      <div className={s.card2Container}>
       <h4 className={s.card2Title}>Status</h4> 
       <h4 className={statusFood=== 'cancelado'?s.statuscancel :s.status}>{statusFood === 'Pedido Listo'? 'En Preparacion': statusFood}</h4>
      </div>   
    </div>
   )
}



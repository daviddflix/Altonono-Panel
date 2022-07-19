import { useEffect, useState, useRef, useContext } from 'react'
import s from './order.module.css'
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"; 
import { addOrder } from '../../Redux/actions';
import Swal from 'sweetalert2'
import sound from './Sounds/SD_ALERT_27.mp3'
import CurrencyFormat from 'react-currency-format'
import { NavLink } from 'react-router-dom';
import { SocketContext } from '../../context/socketContext';


export default function Pedidos(){

    const pedidos = useSelector(state => state.pedidos)
    const statusFood = useSelector(state => state.statusFood)
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    console.log(socket)
    
    useEffect(() => {
        document.title = 'Pedidos'
   })

   const [response, setResponse] = useState("");
   const ref = useRef(new Audio(sound))
  
   useEffect(() => {  
     let isMounted = true
       socket.on('order', data => {
          if (isMounted) setResponse(data)
        
          if(data){
           const notificcation = ref.current;
            const onPlay = () => notificcation.play()
           notificcation.addEventListener('canplaythrough', onPlay)
          Swal.fire({
            title: 'Nuevo Pedido',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Confirmado!', '', 'success')
             dispatch(addOrder(data))
            } 
          })
        }
       })
       
       return ()=> { isMounted = false}
      })
    
   

    return(
        <div  className={s.main}>

            <div className={s.container}>

            <h1 className={s.title}>Pedidos</h1>

            <div className={s.grid}>
            <h4>Hora</h4>
            <h4 >Cliente</h4>
            <h4 >Mesa</h4>
            <h4 >Metodo de Pago</h4>
            <h4>Telefono</h4>
            <h4>Total</h4>
            <h4>Status</h4> 
            </div>
   
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
                  statusFood={statusFood}
                  />
                )
              })    
            }       
          </div>
        </div>
    )
}


function Card({id, name, table, method, telefono, monto, statusFood}){

  const date = new Date()

  return(
    <NavLink  className={s.navLink}  to={`/detail/${id}`}>
    <div id='boxpedido' className={s.boxpedido} >
  <h4>{`${date.getHours()}:${date.getMinutes()}`}</h4>
  <h4>{name}</h4>
  <h4>{table}</h4>
  <h4>{method}</h4>
  <h4>{telefono}</h4>
  <h4><CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
  <h4>{statusFood? statusFood : 'Nuevo'}</h4>
  </div>
  </NavLink>
  )
 
}



import { useEffect, useState, useRef } from 'react'
import s from './search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { addOrder } from '../../Redux/actions';
import Swal from 'sweetalert2'
import sound from './Sounds/SD_ALERT_27.mp3'
import CurrencyFormat from 'react-currency-format'
import { NavLink } from 'react-router-dom';


const port = 'https://altonono.herokuapp.com'



export default function Search(){

    const pedidos = useSelector(state => state.pedidos)
    const dispatch = useDispatch()
  console.log('pedidos', pedidos)
 

    useEffect(() => {
        document.title = 'Pedidos'
   })
  
   
   const [response, setResponse] = useState("");
   console.log('res.socket', response)

   const ref = useRef(new Audio(sound))
 
   useEffect(() => {  
     let isMounted = true
      const socket = io.connect(`${port}`, {transports: ['websocket', 'polling']})
       socket.on('payment', data => {
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
            <h4 className={s.position1}>Metodo de Pago</h4>
            <h4 className={s.position1} >Telefono</h4>
            <h4>Total</h4>
            </div>
   
            {
              pedidos?.map((p, i) => {


                return(

                  <NavLink  className={s.navLink} key={i} to={`/detail/${p.id}`}>
                    <div  className={s.boxpedido} >
                  <h4>{p.updatedAt.slice(11,16)}</h4>
                  <h4>{p.name}</h4>
                  <h4>{p.table}</h4>
                  <h4>{p.method}</h4>
                  <h4>{p.telefono}</h4>
                  <h4><CurrencyFormat value={p.monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
                  </div>
                  </NavLink>
                // <Card key={i} 
                // hora={p.updatedAt}
                //  client={p.name} 
                //  table={p.table}
                //  metodo={p.method} 
                //  telefono={p.email}
                //  total={p.monto} 
                //  product={p.items.map(p => p.title)}
                //  quantity={p.items.map(p => p.quantity)}
                 
                //  />

                
                )
              })
             
            }

                
            </div>
        </div>
    )
}



import { useEffect, useState } from 'react'
import s from './search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { addOrder } from '../../Redux/actions';
import Swal from 'sweetalert2'

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
 
   useEffect(() => {  
      const socket = io.connect(`${port}`, {transports: ['websocket', 'polling']})
       socket.on('payment', data => {
         setResponse(data)
        
        if(data){
          Swal.fire({
            title: 'Nuevo Pedido',
            confirmButtonText: 'Comfirmar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Confirmado!', '', 'success')
             dispatch(addOrder(data))
            } 
          })
        }
       })
      })
      
   

    return(
        <div className={s.main}>

            <div className={s.container}>

            <h1 className={s.title}>Pedidos</h1>

            <div className={s.grid}>
            <h4>Hora</h4>
            <h4>Cliente</h4>
            <h4>Direccion</h4>
            <h4>Telefono</h4>
            <h4>Zona</h4>
            <h4>Total</h4>
            </div>

            {/* {
              pedidos?.map((p, i) => {


                return(
                <Card key={i} updatedAt={p.pago.updatedAt}
                 quantity={lastItem.pedido.map(p => p.quantity)} 
                 product={lastItem.pedido.map(p => p.title)} 
                 toppings={lastItem.pedido.map(p => p.toppings)} 
                 name={p.findUser.name} 
                 address={p.findUser.address}
                 phonenumber={p.findUser.phonenumber} 
                 zona={p.findUser.zona}
                 monto={p.pago.monto}  />
                )
              })
             
            } */}

            </div>
        </div>
    )
}
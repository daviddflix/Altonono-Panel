import s from './dashboard.module.css'
import { useEffect, useRef, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Logout from '../Navbar/Button';
import io from "socket.io-client";
import { addOrder } from '../../Redux/actions';
import Swal from 'sweetalert2'
import sound from '../Search/Sounds/SD_ALERT_27.mp3'

const port = 'https://altonono.herokuapp.com'


export default function Dashboard(){

   const dispatch = useDispatch()
  const pedidos = useSelector(state => state.pedidos)

  const amount = pedidos? pedidos.map(p => p.monto): 0;
  const total = amount? amount.reduce((a,b) => a + b, 0) : 0;

useEffect(() => {
     document.title = 'Dashboard'
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
          width: 600,
          padding: '3em',
          color: '#716add',
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
        <div className={s.main}>
             
              <div className={s.maincontainer}> 
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h1 className={s.title}>Dashboard</h1>
               <Logout/>
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

               <div className={s.box2}>
                    <h3 className={s.box_title}>Pedidos recientes</h3>
                    <div style={{ height: 230, width: '100%' }}>
                    <div className={s.grid}>
            <h4>Hora</h4>
            <h4 >Cliente</h4>
            <h4 >Mesa</h4>
            <h4 >Metodo de Pago</h4>
            <h4 >Telefono</h4>
            <h4>Total</h4>
            </div>
                     {
                        pedidos? pedidos.slice(-5).map((p, i)=> {
                           return(
                              <NavLink className={s.navlink} to={`/detail/${p.id}`} key={i}>
                           <h4>{p.updatedAt.slice(11,16)}</h4>
                           <h4>{p.name}</h4>
                           <h4>{p.table}</h4>
                           <h4>{p.method}</h4>
                           <h4>{p.telefono}</h4>
                  <h4><CurrencyFormat value={p.monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
                              </NavLink>
                           )
                        }) : <div style={{display: 'flex', height: '100%', width: '90%', color: 'red', alignItems: 'center', justifyContent: 'center'}}>
                           <h4>No hay pedidos recientes</h4>
                        </div>
                     }
                      
                    </div>
               </div>   
        
            </div>
        </div>
      )
}   



// function nFormatter(num) {
//   if (num >= 1000000000) {
//      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')} G`;
//   }
//   if (num >= 1000000) {
//      return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')} M`;
//   }
//   if (num >= 1000) {
//      return `${num / 1000} `
//   }
//   return num;
// }
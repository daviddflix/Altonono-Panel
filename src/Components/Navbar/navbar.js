import s from './navbar.module.css';
import {  FaBars } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import ModalContext from '../../context/modalContext';
import Logout from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { getTienda } from '../../Redux/actions';
import {RiRadioButtonLine} from 'react-icons/ri'
import { SocketContext } from '../../context/socketContext';

export default function Navbar (){

    const {variables, setVariables} = useContext(ModalContext);
    const status = useSelector(state => state.status);
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);


    const handleTienda = () => {
        if(status ==='offline'){
            dispatch(getTienda('online'))
          
        }
        if(status === 'online'){
            dispatch(getTienda('offline'))
        }
    };

    const handleOpen = () => {
        if(variables.toggle === false){
            setVariables(prev => ({...prev, toggle: true}))
          
        }
        if(variables.toggle === true){
            setVariables(prev => ({...prev, toggle: false}))
        }
    };

    function sendOffline(){  // plantilla para enviar mensaje
        setInterval(sendOffline, 2000);
        socket.emit('offline', 'offline')
      }

      function sendOnline(){  // plantilla para enviar mensaje
       const uno = setInterval(sendOnline, 2000);
        socket.emit('online', {data: 'online'})
        clearInterval(sendOnline)
      }
console.log('status', status)
    // emite a cada momento el status de la tienda
   useEffect(() => {
        status === 'offline'? setInterval(sendOffline, 2000) :  setInterval(sendOnline, 2000)
   }, [status, socket])




    return(
       <nav  className={s.navbar}> 
           <ul className={s.ul}>
               
               <div onClick={handleOpen} className={s.link}>
              < FaBars className={s.icon}/>
               </div>
               <div className={s.subul}>
              <button onClick={handleTienda} className={s.btnStatusTienda}><RiRadioButtonLine className={status==='offline'? s.iconOffline: s.iconOnline}/>{status}</button>
               <div className={s.btnLogout}><Logout/></div>
              </div>
           </ul>
       </nav>
    )
}

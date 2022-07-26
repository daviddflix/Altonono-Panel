import s from './navbar.module.css'
import {  MdAdminPanelSettings } from 'react-icons/md';
import {  FaBars } from 'react-icons/fa';
import img from '../../Assets/logo.png'
import { useContext, useEffect } from 'react';
import ModalContext from '../../context/modalContext';
import Logout from './Button';
import { Button } from '@mui/material';
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

    // emite a cada momento el status de la tienda
   useEffect(() => {
    if(status === 'offline'){
   socket.emit('offline', {status: 'offline' })
    }
    if(status === 'online'){
      socket.emit('online', {status: 'online' })
       }
   }, [status, socket])


    return(
       <nav  className={s.navbar}> 
           <ul className={s.ul}>
               
               <div onClick={() => setVariables(prev => ({...prev, toggle: !variables.toggle})) } className={s.link}>
              < FaBars className={s.icon}/>
               </div>
               <div className={s.subul}>
              <button onClick={handleTienda} className={s.btnStatusTienda}><RiRadioButtonLine className={status==='Offline'? s.iconOffline: s.iconOnline}/>{status}</button>
               <div className={s.btnLogout}><Logout/></div>
              </div>
           </ul>
       </nav>
    )
}

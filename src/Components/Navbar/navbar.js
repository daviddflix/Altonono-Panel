import s from './navbar.module.css';
import {  FaBars } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import ModalContext from '../../context/modalContext';
import Logout from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, updateStatus } from '../../Redux/actions';
import {RiRadioButtonLine} from 'react-icons/ri'
import  { SpinnerTiny } from '../spinner/spinner';

export default function Navbar (){

  


    const {variables, setVariables} = useContext(ModalContext);
    const status = useSelector(state => state.status);
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch(getStatus())
    }, [dispatch])



    const handleTienda = () => {
        if(status[0].status === "Cerrado"){
            dispatch(updateStatus('Abierto'))
        }
        if(status[0].status === 'Abierto'){
            dispatch(updateStatus('Cerrado'))
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
     
    const conexion = navigator.connection.effectiveType
    const internet = navigator.onLine
    const statusInternet = conexion === '2g' || internet === false  ? 'Revisa tu conexion' : `Conexion estable ${conexion}`

    

    return(
       <nav  className={s.navbar}> 
           <ul className={s.ul}>
               
               <div onClick={handleOpen} className={s.link}>
              < FaBars className={s.icon}/>
               </div>
               <div className={s.subul}>
                <h3 style={internet === true ? {color: '#10c15b'} : {color: 'red'}} className={s.internet}>{statusInternet}</h3>
                <button disabled={admin.role === 'mozos'} onClick={handleTienda} className={s.btnStatusTienda}><RiRadioButtonLine className={status.length === 0 ? s.iconOffline: status[0].status ==='Cerrado'? s.iconOffline: s.iconOnline}/>{status.length === 0? <SpinnerTiny />: status[0].status}</button>
               <div className={s.btnLogout}><Logout/></div>
              </div>
           </ul>
       </nav>
    )
} 


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
    console.log('conexion:',conexion)
    const statusInternet = internet === true ? `Conexion estable ${conexion}` : 'Revisa tu conexion'

    return(
       <nav  className={s.navbar}> 
           <ul className={s.ul}>
               
               <div onClick={handleOpen} className={s.link}>
              < FaBars className={s.icon}/>
               </div>
               <div className={s.subul}>
                <h3 style={internet === true ? {color: '#10c15b'} : {color: 'red'}} className={s.internet}>{statusInternet}</h3>
                <button onClick={handleTienda} className={s.btnStatusTienda}><RiRadioButtonLine className={status.length === 0 ? s.iconOffline: status[0].status ==='Cerrado'? s.iconOffline: s.iconOnline}/>{status.length === 0? <SpinnerTiny />: status[0].status}</button>
                {/* {status.length > 0 ? <button onClick={handleTienda} className={s.btnStatusTienda}><RiRadioButtonLine className={status[0].status ==='Cerrado'? s.iconOffline: s.iconOnline}/>{status.length === 0? <SpinnerTiny />: status[0].status}</button> :  <button className={s.btnNoStatus}><SpinnerTiny/></button> } */}
               <div className={s.btnLogout}><Logout/></div>
              </div>
           </ul>
       </nav>
    )
} 


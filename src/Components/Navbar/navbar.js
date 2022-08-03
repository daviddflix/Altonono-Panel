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

 
    const getStoreStatus = status && status.map(p => p.status)
   

    const handleTienda = () => {
        if(getStoreStatus[0] ==='offline'){
            dispatch(updateStatus('online'))
            dispatch(getStatus())
          
        }
        if(getStoreStatus[0] === 'online'){
            dispatch(updateStatus('offline'))
            dispatch(getStatus())
        }
    };

    useEffect(() => {
        dispatch(getStatus())
    }, [])

    

    const handleOpen = () => {
        if(variables.toggle === false){
            setVariables(prev => ({...prev, toggle: true}))
          
        }
        if(variables.toggle === true){
            setVariables(prev => ({...prev, toggle: false}))
        }
    };


    return(
       <nav  className={s.navbar}> 
           <ul className={s.ul}>
               
               <div onClick={handleOpen} className={s.link}>
              < FaBars className={s.icon}/>
               </div>
               <div className={s.subul}>
              <button onClick={handleTienda} className={s.btnStatusTienda}><RiRadioButtonLine className={getStoreStatus[0] ==='offline'? s.iconOffline: s.iconOnline}/>{getStoreStatus[0] === undefined? <SpinnerTiny />: getStoreStatus[0]}</button>
               <div className={s.btnLogout}><Logout/></div>
              </div>
           </ul>
       </nav>
    )
} 


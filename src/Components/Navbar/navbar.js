import s from './navbar.module.css'
import {  MdAdminPanelSettings } from 'react-icons/md';
import {  FaBars } from 'react-icons/fa';
import img from '../../Assets/logo.png'
import { useContext } from 'react';
import ModalContext from '../../context/modalContext';
import Logout from './Button';
import { Button } from '@mui/material';

export default function Navbar (){

    const {variables, setVariables} = useContext(ModalContext);

    return(
       <nav  className={s.navbar}> 
           <ul className={s.ul}>
               
               <div onClick={() => setVariables(prev => ({...prev, toggle: !variables.toggle})) } className={s.link}>
              < FaBars className={s.icon}/>
               </div>
               <div>
              <Logout/>
              </div>
           </ul>
       </nav>
    )
}

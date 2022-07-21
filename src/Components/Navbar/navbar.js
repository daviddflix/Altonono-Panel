import s from './navbar.module.css'
import {  MdAdminPanelSettings } from 'react-icons/md';
import img from '../../Assets/logo.png'

export default function Navbar (){


    return(
       <nav className={s.navbar}> 
           <ul className={s.ul}>
               <div className={s.link}>
              < MdAdminPanelSettings className={s.icon}/>
                  Panel Administracion
               </div>
               <img src={img} className={s.logo} alt='logo' />
           </ul>
       </nav>
    )
}

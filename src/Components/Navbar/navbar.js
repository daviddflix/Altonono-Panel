import s from './navbar.module.css'
import {  MdAdminPanelSettings } from 'react-icons/md';
import VerticalNavbar from '../Vertical Navbar/verticalNavbar';


export default function Navbar (){


    return(
       <nav className={s.navbar}> 
           <ul className={s.ul}>
               <div className={s.link}>
              < MdAdminPanelSettings className={s.icon}/>
                  Panel Administracion
               </div>
           </ul>

           <VerticalNavbar/>
       </nav>
    )
}

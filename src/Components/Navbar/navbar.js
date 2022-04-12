import {NavLink} from 'react-router-dom'
import s from './navbar.module.css'
import {  MdAdminPanelSettings } from 'react-icons/md';
import VerticalNavbar from '../Vertical Navbar/verticalNavbar';


export default function Navbar (){
    return(
       <nav className={s.navbar}> 
           <ul className={s.ul}>
               <NavLink to='/' className={s.link}>
              < MdAdminPanelSettings className={s.icon}/>
                  Panel Administration
               </NavLink>

               <NavLink to='/' className={s.link}>
                  DeViaje.com
               </NavLink>
           </ul>

           <VerticalNavbar/>
       </nav>
    )
}
import {NavLink} from 'react-router-dom'
import s from './navbar.module.css'
import {  MdAdminPanelSettings } from 'react-icons/md';
import VerticalNavbar from '../Vertical Navbar/verticalNavbar';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';


export default function Navbar (){
    
    const handleMailIcon = (e) => {
        e.preventDefault();
        window.location = 'mailto:david-972010@hotmail.com'
    }
    return(
       <nav className={s.navbar}> 
           <ul className={s.ul}>
               <NavLink to='/' className={s.link}>
              < MdAdminPanelSettings className={s.icon}/>
                  Panel Administracion
               </NavLink>

               <NavLink to='/' className={s.link}>
               <Badge badgeContent={'0'} color="primary" style={{marginRight:'1rem'}}>
                    <MailIcon className={s.iconMail} onClick={handleMailIcon}/>
                  </Badge>
                  Hit Pasta
               </NavLink>
           </ul>

           <VerticalNavbar/>
       </nav>
    )
}

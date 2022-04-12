import {NavLink} from 'react-router-dom'
import s from './verticalNavbar.module.css'
import {FaUser} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'
import {MdPayment} from 'react-icons/md'

export default function VerticalNavbar (){
    return(
       <nav className={s.navbar}>
           <ul className={s.ul}>
           <NavLink to='/dashboard' className={s.link}>
              <MdDashboard className={s.icon}/>
                  Dashboard 
               </NavLink>

               <NavLink to='/payments' className={s.link}>
                <MdPayment className={s.icon}/>
                  payments
               </NavLink>

               <NavLink to='/clients' className={s.link}>
                   <FaUser className={s.icon}/>
                  Clients
               </NavLink>

        
           </ul>
       </nav>
    )
}
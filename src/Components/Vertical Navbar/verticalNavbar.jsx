import {NavLink} from 'react-router-dom'
import s from './verticalNavbar.module.css'
import {FaUser} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'
import {MdPayment} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'

export default function VerticalNavbar (){
    return(
       <nav className={s.navbar}>
           <ul className={s.ul}>
           <NavLink to='/dashboard' activeClassName={s.active} className={s.link}>
              <MdDashboard className={s.icon}/>
                  Dashboard 
               </NavLink>

               <NavLink to='/payments' activeClassName={s.active} className={s.link}>
                <MdPayment className={s.icon}/>
                  payments
               </NavLink>

               <NavLink to='/clients' activeClassName={s.active} className={s.link}>
                   <FaUser className={s.icon}/>
                  Users
               </NavLink>

               <NavLink to='/search' activeClassName={s.active} className={s.link}>
                   <BsSearch className={s.icon}/>
                  Search Travelers
               </NavLink>

        
           </ul>
       </nav>
    )
}
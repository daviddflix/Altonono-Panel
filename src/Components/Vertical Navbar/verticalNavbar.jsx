import {NavLink} from 'react-router-dom'
import s from './verticalNavbar.module.css'
import {MdDashboard} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import {GoListUnordered} from 'react-icons/go'
import {GiMeal} from 'react-icons/gi'
import {AiFillSetting} from 'react-icons/ai'

export default function VerticalNavbar (){
    return(
       <nav className={s.navbar}>
           <ul className={s.ul}>
           <NavLink to='/dashboard' activeClassName={s.active} className={s.link}>
              <MdDashboard className={s.icon}/>
                  Dashboard 
               </NavLink>

               <NavLink to='/orders' activeClassName={s.active} className={s.link}>
                   <GoListUnordered className={s.icon}/>
                Pedidos
               </NavLink>

               
               <NavLink to='/resume' activeClassName={s.active} className={s.link}>
                   <GiMeal className={s.icon}/>
                <div >
                 Resumen del Pedido
                </div>
               </NavLink>
           </ul>
           <ul>
           <NavLink to='/settings' activeClassName={s.active} className={s.link}>
                <AiFillSetting className={s.icon}/>
                Configuracion
            </NavLink>
           </ul>
       </nav>
    )
}
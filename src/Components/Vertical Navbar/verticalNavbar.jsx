import {NavLink} from 'react-router-dom'
import s from './verticalNavbar.module.css'
import {MdDashboard} from 'react-icons/md'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {GoListUnordered} from 'react-icons/go'
import {GiMeal} from 'react-icons/gi'
import {MdAdminPanelSettings} from 'react-icons/md'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useContext, useState } from 'react'
import ModalContext from '../../context/modalContext'

export default function VerticalNavbar (){

  const {toggle, setToggle} = useContext(ModalContext)

    return(
<nav style={toggle === false ? {width: '18%'}: {width: '7%'}} className={s.navbar}>
<ProSidebar  width={'100%'}  collapsed={toggle} >
  <Menu iconShape="square">
    <MenuItem icon={<MdDashboard />}>Dashboard<NavLink to='/'/></MenuItem>
    <MenuItem icon={<GoListUnordered />}>Pedidos <NavLink to='/orders'/></MenuItem>
    <MenuItem icon={<GiMeal />}>Resumen<NavLink to='/resume'/></MenuItem>
    <MenuItem icon={<MdProductionQuantityLimits />}>Menu<NavLink to='/menu'/></MenuItem>
  </Menu>
</ProSidebar>
</nav>
    //    <nav className={s.navbar}>
    //        <ul className={s.ul}>
    //        <NavLink to='/'  className={s.link}>
    //           <MdDashboard className={s.icon}/>
    //               Dashboard 
    //            </NavLink>

    //            <NavLink to='/orders' activeClassName={s.active} className={s.link}>
    //                <GoListUnordered className={s.icon}/>
    //             Pedidos
    //            </NavLink>

               
    //            <NavLink to='/resume' activeClassName={s.active} className={s.link}>
    //                <GiMeal className={s.icon}/>
    //             <div >
    //              Resumen del Pedido
    //             </div>
    //            </NavLink>
    //        </ul>
    //        <ul>
    //        <NavLink to='/settings' activeClassName={s.active} className={s.link}>
    //             <AiFillSetting className={s.icon}/>
    //             Configuracion
    //         </NavLink>
    //        </ul>
    //    </nav>
    )
}
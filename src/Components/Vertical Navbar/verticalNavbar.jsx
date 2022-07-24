import {NavLink} from 'react-router-dom'
import s from './verticalNavbar.module.css'
import {MdDashboard} from 'react-icons/md'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {GoListUnordered} from 'react-icons/go'
import {GiMeal} from 'react-icons/gi'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useContext } from 'react'
import ModalContext from '../../context/modalContext'

export default function VerticalNavbar (){

  const {variables} = useContext(ModalContext);
  const windowlength = window.matchMedia("(max-width:600px)")

    return(
<nav  className={s.navbar}>
<ProSidebar width={variables.sidebarWidth}   collapsedWidth={windowlength.matches=== true? '0px': '80px'} collapsed={variables.toggle} >
  <Menu iconShape="square">
    <MenuItem icon={<MdDashboard />}>Dashboard<NavLink to='/'/></MenuItem>
    <MenuItem icon={<GoListUnordered />}>Pedidos <NavLink to='/orders'/></MenuItem>
    <MenuItem icon={<GiMeal />}>Resumen<NavLink to='/resume'/></MenuItem>
    <MenuItem icon={<MdProductionQuantityLimits />}>Menu<NavLink to='/menu'/></MenuItem>
  </Menu>
</ProSidebar>
</nav>
    )
}
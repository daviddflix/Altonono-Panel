import {NavLink} from 'react-router-dom'
import s from './verticalNavbar.module.css'
import {MdDashboard} from 'react-icons/md'
import {MdProductionQuantityLimits} from 'react-icons/md'
import {GoListUnordered} from 'react-icons/go'
import {GiMeal} from 'react-icons/gi'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useContext } from 'react'
import ModalContext from '../../context/modalContext';
import React, { useRef, useEffect } from "react";

export default function VerticalNavbar (){

  const {variables, setVariables} = useContext(ModalContext);
  const windowlength = window.matchMedia("(max-width:700px)");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (windowlength.matches === true && variables.toggle === false) {
         if(wrapperRef.current && !wrapperRef.current.contains(event.target)){
          setVariables(prev => ({...prev, toggle: true}))
         }
      }
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        if(windowlength.matches === true && variables.toggle === false){
         setVariables(prev => ({...prev, toggle: true}))
        }
     }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

    return(
<nav ref={wrapperRef}  className={s.navbar}>
<ProSidebar width={variables.sidebarWidth}   collapsedWidth={windowlength.matches=== true? '0px': '80px'} collapsed={variables.toggle} >
  <Menu iconShape="square">
    <MenuItem icon={<MdDashboard />}>Dashboard<NavLink to='/'/></MenuItem>
    <MenuItem icon={<GoListUnordered />}>Pedidos <NavLink to='/orders'/></MenuItem>
    <MenuItem icon={<GiMeal />}>Historial<NavLink to='/resume'/></MenuItem>
    <MenuItem icon={<MdProductionQuantityLimits />}>Menu<NavLink to='/menu'/></MenuItem>
  </Menu>
</ProSidebar>
</nav>
    )
}



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
  const windowlength = window.matchMedia("(max-width:700px)")
  console.log('variables', variables)
  console.log('windowlength', windowlength)
  const wrapperRef = useRef(null);

  useEffect(() => {

    if(windowlength.matches === true){
      setVariables(prev => ({...prev, toggle: true}))
    }
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
         if(windowlength.matches === true && variables.toggle === false){
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

    return(
<nav ref={wrapperRef}  className={s.navbar}>
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


/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {


  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
import { useState } from "react"
import s from './restore.module.css'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux';
import { updatePassword } from "../../Redux/actions";
import { NavLink } from 'react-router-dom';
import img from '../../Assets/descarga-removebg-preview.png'

export default function Restore(){

    const [data, setData] = useState('');
    const [reset, setReset] = useState(false);
    const dispatch = useDispatch()

    const handleRestore = (e) => {
       setData(e.target.value)
    }

    console.log('data', data)

    const handleDispatch = () => {
      dispatch(updatePassword(data))
      setReset(true)
    }

   return(
     <div className={s.mainbox}>
         <form className={s.form}>
            <img className={s.img} src={img} alt='Logo'/>
           {
            reset === false?
            <div className={s.subcontainerform}>
               <label className={s.label} htmlFor="password">Recuperar contraseña</label>
               <input className={s.input} value={data} onChange={handleRestore} id="password" placeholder="Ingresa tu nueva contraseña"/>
               <Button className={s.btn} onClick={handleDispatch} variant="contained">Continuar</Button>
            </div> :
             <h2 className={s.restorePassword}>Contraseña restaurada</h2>
           }
         <NavLink className={s.navlink} to={'/'}>Iniciar Sesion</NavLink>
         </form>

     </div>
   )
}
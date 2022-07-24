import { useEffect } from 'react';
import { useContext } from 'react'
import ModalContext from '../../context/modalContext'
import s from './menu.module.css'

export default function Menu(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:600px)")

    useEffect(() => {
        document.title = 'Menu'
   })

    const styles = {
        length : {
            width: 'calc(100vw - 80px)',
            position: 'relative',
            left: '80px'
        },
        moreLength: {
            width: 'calc(100vw - 200px)',
            position: 'relative',
            left: '200px'
        },
        less: {
           width : '100vw'
        }
    }

    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.maincontainer}>
            Hola
        </div>
    )
}
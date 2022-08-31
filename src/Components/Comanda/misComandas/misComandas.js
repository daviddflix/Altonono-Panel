import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import ModalContext from "../../../context/modalContext";
import { getUserById } from "../../../Redux/actions";
import { Header } from "../comanda";
import s from './miscomandas.module.css'
import {FcList} from 'react-icons/fc'

export default function MisComandas(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const user = useSelector(state => state.userById)
    console.log('user', user)
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getUserById(id))
    }, [])

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

    const items = user.length > 0 ? user[0].payments : []
    console.log('items', items)

    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
            <div className={s.submain}>
                <Header user={!user.length ? "cargando" : user[0].name}/>
                <div className={s.container}>
                    {
                        items.length > 0 ? items.map(p => {
                            return(
                               <Card id={p.id} key={p.id} name={p.name} method={p.method}/>
                            )
                        }) : <div className={s.containerNocomanda}>
                            <FcList className={s.listIcon}/>
                            <h3>No hay comandas creadas</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


function Card({id, name, method}){
    return(
        <NavLink className={s.cardmain} to={`detalleComanda/${id}`}>
           <h3 className={s.cardname}>{name}</h3>
           <div className={s.metodo}>
             <h6>{method}</h6>
           </div>
        </NavLink>
    )
}
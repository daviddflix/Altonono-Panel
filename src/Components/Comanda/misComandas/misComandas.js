import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import ModalContext from "../../../context/modalContext";
import { getUserById } from "../../../Redux/actions";
import { Header } from "../comanda";
import s from './miscomandas.module.css'

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

    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
            <div className={s.submain}>
                <Header user={!user.length ? "cargando" : user[0].name}/>
                <div className={s.container}>
                    {
                        user.length > 0 && user.map(p => {
                            return(
                               <Card id={p.id} key={p.id} name={p.name}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


function Card({id, name, table}){
    return(
        <NavLink className={s.cardmain} to={`detalleComanda/${id}`}>
           <div className={s.cardsubmain}>
           <h3>{name}</h3>
           <h3>{table}</h3>
           </div>
        </NavLink>
    )
}
import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router-dom";
import ModalContext from "../../../context/modalContext";
import { emptyDetails, getUserById } from "../../../Redux/actions";
import { Header } from "../comanda";
import s from './mesaAbierta.module.css'
import {SiAirtable} from 'react-icons/si'
import moment from 'moment'

export default function MesaAbierta(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const user = useSelector(state => state.userById)

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getUserById(id))
    }, [dispatch, id])

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

    const date = moment().format('l')
    const items = user.length > 0 ? user[0].payments.filter(p => p.date === date) : []
    const filterbyState = items.length > 0 ? items.filter(p => p.status === 'Mesa Abierta') : []


    return(
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
            <div className={s.submain}>
                <Header user={!user.length ? "cargando" : user[0].name}/>
                <div className={s.container}>
                    {
                        filterbyState.length > 0 ? filterbyState.map(p => {
                            return(
                               <Card id={p.id} key={p.id} name={p.name} table={p.table}/>
                            )
                        }) : <div className={s.containerNocomanda}>
                            <SiAirtable className={s.listIcons}/>
                            <h3>No hay mesas abiertas</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


function Card({id, name, table}){ 

    const dispatch = useDispatch();
    const history = useHistory();


    const seeDetail = () => {
        dispatch(emptyDetails())
        history.push(`/open_tab/detalleComanda/${id}`)
    }

    return(
        <div onClick={seeDetail}  className={s.cardmain}>
           <h3 className={s.cardname}>{name}</h3>
           <div className={s.metodo}>
             <h6>Mesa {table}</h6>
           </div>
        </div>
    )
}
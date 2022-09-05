import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import s from './detalleComanda.module.css'
import CurrencyFormat from 'react-currency-format'
import {RiArrowLeftSLine} from 'react-icons/ri'
import ModalContext from "../../../context/modalContext";
import { getDetails } from "../../../Redux/actions";
import Spinner from "../../spinner/spinner";

export default function DetailMesa (){

    const dispatch = useDispatch();
    const {id} = useParams();
    const detalle = useSelector(state => state.detalle);
    const history = useHistory();
    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");

    useEffect( () => {
        dispatch(getDetails(id))
     }, [id, dispatch])

    const goback = () => {
      history.goBack()
    }

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
            {
                detalle.items ? <div className={s.submain}>
                     <div className={s.containerArrow}>
                        <RiArrowLeftSLine onClick={goback} className={s.arrowleft}/>
                        <h3 className={s.maintitle}>Detalle del pedido</h3>
                     </div>
                    <div className={s.box1}>
                       {
                        detalle.items && detalle.items.map(p => {
                            return(
                               <div key={p.id} className={s.subbox1}>
                                    <div className={s.subbox_}>
                                        <h4 className={s.quantity}>x{p.quantity}</h4>
                                        <h4>{p.title}</h4>
                                    </div>
                                    <CurrencyFormat value={p.unit_price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                               </div>
                            )
                        })
                       }
                    </div>
                    <div className={s.containerResumen}><h3>Resumen</h3></div>
                    <div className={s.box2}>
                        <div className={s.subbox2}>
                            <h4 className={s.subbox2_title}>Forma de pago</h4>
                            <h4 className={s.method}>{detalle.method}</h4>
                        </div>
                        <div className={s.subbox2}>
                            <h4 className={s.subbox2_title}>Total</h4>
                            <CurrencyFormat value={detalle.monto} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        </div>
                    </div>
                    <div className={s.containerResumen}><h3>Estado</h3></div>
                    <div className={s.box2}>
                        <div className={s.subbox2}>
                            <h4 className={s.status}>{detalle.status}</h4>
                        </div>
                    </div>
                </div> :
                <div className={s.containerSpinner}><Spinner/></div>
            }
        </div>
    )
}
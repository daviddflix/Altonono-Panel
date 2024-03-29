import * as React from 'react';
import s from './insidepanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {BsCartX} from 'react-icons/bs'
import {MdOutlineWbTwilight} from 'react-icons/md'
import {BsCartCheck} from 'react-icons/bs'
import { useHistory } from 'react-router-dom';
import ModalContext from '../../context/modalContext';
import {  emptyDetails, getAllOrdersOfTheDay, getStatus, setCrono, updateStatusOrderInConfirm } from '../../Redux/actions';



export default function IncomingOrders() {

  const dispatch = useDispatch();
  const orders = useSelector(state => state.queueOfTheDay);

  const newOrders = orders.length > 0 ? orders.filter(p => p.status === "Aceptar") : []
  const confirmOrder = orders.length > 0 ? orders.filter(p => p.status === "Pedido Listo") : []


  const {variables} = React.useContext(ModalContext);
  const windowlength = window.matchMedia("(max-width:700px)")
  
  React.useEffect(() => {
      document.title = 'Pedidos'
 })

 React.useEffect(() => {
  dispatch(getStatus())
 }, [dispatch])

 React.useEffect(() => {
  dispatch(getAllOrdersOfTheDay())
 }, [dispatch])



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




  return (
    <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} className={s.main}>
      <div className={s.submain}>
        <div className={s.new}>
            <h2 className={s.title}>Nuevos</h2>
            <div className={s.subnew}>
              {
                newOrders.length > 0 ? newOrders.map((p, i) => {
                  return(
                  <Card
                  key={p.id}
                  name={p.name}
                  id={p.id}
                 
                  />
                  )
                }): <div className={s.noOrder}>
                  <BsCartX className={s.iconNoOrder}/>
                  <h3>Aun no tienes pedidos</h3>
                </div>
              }
            </div>
        </div>
        <div className={s.new}>
            <h2 className={s.title}>Confirmados</h2>
            <div className={s.subnew}>
            {
              confirmOrder.length>0 ? confirmOrder.map((p, i) => {
                return(
                  <Card2
                  key={i}
                  name={p.name}
                  method={p.method}
                  id={p.id}
                  table={p.table}
                  monto={p.monto}
                  telefono={p.telefono}
                  />
                )
              }): <div className={s.noOrder}>
              <BsCartCheck className={s.iconNoOrder}/>
              <h3>Pedidos sin confirmar</h3>
            </div>
            }
            </div>
        </div>
      </div>
    </div>
  );
}


export function Card({name, id}){

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllOrdersOfTheDay())
   }, [dispatch])

   const handleDetails = () => {
    dispatch(emptyDetails())
    history.push(`/detail/${id}`)
  }

  
  return(
    <div onClick={handleDetails} className={s.cardMainBox}>
      <div style={{display: 'flex', position: 'relative', right: '1rem'}}>
       <MdOutlineWbTwilight className={s.iconCircle}/>
       <h4 style={{margin: '0 1rem 0 0'}}>#{id}</h4>
       <h4 style={{margin: '0px'}}>Nuevo pedido</h4>
      </div>
      <h4>{name}</h4>
    </div>
  )
}


export function Card2({id, method, name}){

  const valueCrono = useSelector(state => state.crono);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getAllOrdersOfTheDay())
   }, [dispatch])

  const getValue = valueCrono && valueCrono.find(p => p.id === id);

  const handleDelivery = (e) => {
     e.stopPropagation()
    dispatch(updateStatusOrderInConfirm({status : 'Pedido Finalizado', id: id}))
  }


  const handleDetail = () => {
    dispatch(emptyDetails())
    history.push(`/detail/${id}`)
  }

  
React.useEffect(() => {
    setInterval(() => {
      dispatch(setCrono({id, timer: 1}))
      }, 60000);
}, [dispatch, id])

  return(
    <div onClick={handleDetail} className={s.card2MainBox}>
      <div className={s.subcard2box}>
        <div>
          <h3 className={s.font}>#{id}</h3>
          <h3 className={s.font}>{name}</h3>
        </div>
        <h4 className={s.method}>{method}</h4>
        <button id='readyto' className={s.readyto} onClick={handleDelivery}>Pedido Listo</button>
      </div>
      <div className={s.subcard2boxtime}>
        <h4 className={s.font}>Tiempo de preparacion</h4>
        <h4 className={s.font}>{getValue? getValue.timer : 0} minutos</h4>
      </div>
    </div>
  )
}


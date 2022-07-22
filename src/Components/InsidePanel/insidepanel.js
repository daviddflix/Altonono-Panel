import * as React from 'react';
import s from './insidepanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {BsCartX} from 'react-icons/bs'
import {MdOutlineWbTwilight} from 'react-icons/md'
import {GiConfirmed} from 'react-icons/gi'
import { NavLink, useHistory } from 'react-router-dom';
import { SocketContext } from '../../context/socketContext';

export default function IncomingOrders() {

  
  const newOrder = useSelector(state => state.queue);
  const confirmOrder = useSelector(state => state.confirmOrder);


  return (
    <div className={s.main}>
      <div className={s.submain}>
        <div className={s.new}>
            <h2 className={s.title}>Nuevos</h2>
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
              {
                newOrder.length>0? newOrder.map((p, i) => {
                  return(
                  <Card
                  key={p.id}
                  name={p.name}
                  id={p.id}
                  />
                  )
                }): <div className={s.noOrder}>
                  <BsCartX className={s.iconNoOrder}/>
                  <h3>No hay pedidos aun</h3>
                </div>
              }
            </div>
        </div>
        <div className={s.new}>
            <h2 className={s.title}>Confirmados</h2>
            <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
            {
              confirmOrder && confirmOrder.map((p, i) => {
                return(
                  <Card2
                  key={i}
                  name={p.name}
                  method={p.method}
                  id={p.id}
                  />
                )
              })
            }
            </div>
        </div>
      </div>
    </div>
  );
}


function Card({name, id}){

  
  return(
    <NavLink to={`/detail/${id}`} className={s.cardMainBox}>
      <div style={{display: 'flex', position: 'relative', right: '2rem'}}>
       <MdOutlineWbTwilight className={s.iconCircle}/>
       <h4>Nuevo pedido</h4>
      </div>
      <h4>{name}</h4>
    </NavLink>
  )
}


function Card2({id, method, name}){

  const socket = React.useContext(SocketContext);
  const [crono, setCrono] = React.useState(0)
  const [entrega, setEntrega] = React.useState(false);


  React.useEffect(() => {
    if(entrega === false){
      setInterval(() => {
        setCrono((crono) => crono + 1)
        }, 60000);
    }
   if(entrega === true){
    clearInterval()
   }

  }, [entrega])

  React.useEffect(() => {
    setCrono(JSON.parse(window.sessionStorage.getItem("crono")))
  }, [])

  React.useEffect(() => {
    window.sessionStorage.setItem("crono", crono)
  }, [crono])


  const handleEntrega = (e) => {
    e.stopPropagation()
    setEntrega(true)
    socket.emit('pedidoListo', {status: 'Pedido Listo'})
  }

  React.useEffect(() => {
    if(entrega === true){
      document.getElementById('readyto').style.backgroundColor = 'transparent'
    } else {
      document.getElementById('readyto').style.backgroundColor = 'rgba(0,0,0,0.2)'
    }
  }, [entrega])

  const history = useHistory();

  const handleDetail = () => {
    history.push(`/detail/${id}`)
  }

  return(
    <div onClick={handleDetail} className={s.card2MainBox}>
      <div className={s.subcard2box}>
        <div>
          <h3 className={s.font}>#{id}</h3>
          <h3 className={s.font}>{name}</h3>
        </div>
        <h4 className={s.method}>{method}</h4>
          <button id='readyto' className={s.readyto} onClick={handleEntrega}>{entrega === false? 'Pedido Listo': <GiConfirmed className={s.sendConfirm}/>}</button>
      </div>
      <div className={s.subcard2boxtime}>
        <h4 className={s.font}>Tiempo de preparacion</h4>
        <h4 className={s.font}>{crono} minutos</h4>
      </div>
    </div>
  )
}
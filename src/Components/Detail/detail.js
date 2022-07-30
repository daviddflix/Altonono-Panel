import {  useContext, useEffect, useState } from 'react'
import s from './detail.module.css'
import { useHistory, useParams } from 'react-router-dom';
import { cancelar, getDetails, setStatusFood } from '../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {BsArrowLeft} from 'react-icons/bs'
import {BsPersonPlus} from 'react-icons/bs'
import {GiRoundTable} from 'react-icons/gi'
import {FaWhatsapp} from 'react-icons/fa'
import {IoIosArrowForward} from 'react-icons/io'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import Spinner from '../spinner/spinner'
import ModalContext from '../../context/modalContext'
import {GiConfirmed} from 'react-icons/gi'

export default function Detail (){

    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory();
    const detalle = useSelector(state => state.detalle);
    const cardStatus = useSelector(state => state.cardStatusDelivery);
    const confirmOrder = useSelector(state => state.confirmOrder);
    const allOrders = useSelector(state => state.allOrders);
    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
console.log('details', detalle)
    useEffect( () => {
      dispatch(getDetails(id))
   }, [id, dispatch])

    const changeBtn =  confirmOrder.length > 0 && confirmOrder.filter(p => p.id === id)
    const completedOrder = allOrders.length > 0 && allOrders.filter(p => p.detalle.id === id)

    
  const [findCardStatusById, setFindCardStatusById] = useState(false)
 

  useEffect(() => {

    const found = cardStatus.length > 0 && cardStatus.find(p => p.id === id);

    if(cardStatus.length > 0 && found){
    
      if(found.delivery === true){
          setFindCardStatusById(true)
    }
}
    
  }, [cardStatus, id])


   

    const cancel = () => {
      return(
        Swal.fire({
          title: 'Confirmar cancelacion',
          input: 'text',
          inputPlaceholder: 'Razon de cancelacion',
          inputAttributes: {
            autocapitalize: 'off'
          },
          confirmButtonText: 'Cancelar',
          confirmButtonColor: '#ff595a',
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
        
            if(!login){
              Swal.showValidationMessage(
                `Especificar motivo de cancelacion`
              )
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Cancelado!',
              'Pedido cancelado.',
              'success'
            )
            dispatch(cancelar({detalle, status : 'cancelado', razon: result}))
            history.push('/orders')
          }
        })
      )
    }
   

    const handleStatus = (e) => {
      Swal.fire({
        icon: 'success',
        title: 'Pedido Aceptado',
        showConfirmButton: false,
        timer: 1500
      })
       dispatch(setStatusFood(detalle))
       history.push('/orders')
    }

  
  useEffect(() => {
       document.title = 'Detalle'
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

   const link = `https://wa.me/${detalle.telefono}?text=Hola%20`
   
    return(
  <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less}  className={s.main}>
      <div className={s.submain}>
         <BsArrowLeft className={s.arrow} onClick={history.goBack}/>

    <div className={s.mainContainer}>  
      <div className={s.subcontainer}>
        <div className={s.boxNumeroPedido}>
            <h4>Altonono</h4>
            <div>
              <h2>Pedido n. {detalle.id}</h2>
            </div>
            <h4 style={{color: 'green'}}>{detalle.method}</h4>
        </div>
        <div className={s.boxClientAndTable}>

        <div className={s.subboxClientAndTable}>
        <div className={s.boxClient}>
        <BsPersonPlus className={s.iconPerson}/>
        <div>
        <h4 className={s.title}>Cliente</h4>
        <h3 style={{margin: 0}}>{detalle.name}</h3>
        </div>
        </div>

        <div className={s.boxClient} >
        <GiRoundTable className={s.iconPerson}/>
        <div>
            <h4 className={s.title}>N. Mesa</h4>
            <h3  style={{margin: 0}}>{detalle.table}</h3>
        </div>
        </div>
        <div className={s.boxClientWhatsapp}>
        <FaWhatsapp className={s.iconwhatsapp}/>
        <div>
           <a style={{textDecoration: 'none'}} href={link}>
           <h4 className={s.title}>Telefono</h4>
            <h3 style={{color: '#292929', margin: 0}}>{detalle.telefono}</h3>
           </a>
        </div>
        <IoIosArrowForward className={s.arrowForward}/>
        </div>
        </div>

     
        <div className={s.btns}>
        {
        completedOrder.length > 0 ? <button className={s.completedOrder}>Orden Finalizada</button> :
       changeBtn.length > 0?  
       <button className={s.acceptbutton}  >{ findCardStatusById === true? <GiConfirmed/>: 'Pedido Listo'}</button> :
          <button className={s.acceptbutton} onClick={handleStatus} >Aceptar</button> 

         }
        </div>
        </div>
        </div>
           <button disabled={ completedOrder.length > 0} className={ completedOrder.length > 0 ? s.arrow2disable : s.arrow2} onClick={cancel}>Cancelar</button>
        <div className={s.subcontainer2}>    
            <div className={s.container2}>
                {
                  detalle.items ? detalle.items.map((item,i) => {
                      return(
                        <div key={i} className={s.items}>
                        <h4 className={s.title}>{item.quantity} x</h4>
                        <h4>{item.title}</h4>
                        <h4>ARS{item.unit_price}</h4>
                    </div>
                      )
                    }) : <div className={s.containerSpinner}><Spinner/></div>
                }

              </div>
              {
                  detalle.comentarios && <div className={s.boxItems}>
                  <h4>{detalle.comentarios}</h4>
              </div>
              }
                  
       <div className={s.boxTotal}>
          <h3>Total</h3>
          <h4><CurrencyFormat value={detalle.monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
      </div>
     
    </div>
  </div>    
</div>
</div>
    )
}




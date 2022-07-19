import {  useContext, useEffect, useState } from 'react'
import s from './modal.module.css'
import { useHistory, useParams } from 'react-router-dom';
import { cancelar, getDetails, setStatusFood } from '../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {BsArrowLeft} from 'react-icons/bs'
import {BsPersonPlus} from 'react-icons/bs'
import {GiRoundTable} from 'react-icons/gi'
import {BsTelephonePlus} from 'react-icons/bs'
import CurrencyFormat from 'react-currency-format'
import Swal from 'sweetalert2'
import ModalContext from '../../context/modalContext';
import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Spinner from '../spinner/spinner'

export default function Detail (){

    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory()
    // const {statusFood, setStatusFood} = useContext(ModalContext)
    const detalle = useSelector(state => state.detalle)
    const statusFood = useSelector(state => state.statusFood)
   console.log('detalle', detalle)

    useEffect( () => {
       dispatch(getDetails(id))
    }, [id, dispatch])

    const back = () => {
        history.push('/search')
    }

    const cancel = () => {
        Swal.fire({
            title: 'Confirmar cancelacion?',
            showDenyButton: true,
            confirmButtonText: 'Cancelar',
            denyButtonText: `No Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Cancelado!', '', 'success')
              dispatch(cancelar(id))
              history.push('/search')
            } else if (result.isDenied) {
              Swal.fire('Pedido no cancelado', '', 'info')
            }
          })
    }
   
    const handleCheck = (e) => {
      dispatch(setStatusFood(e.target.value))
    }
   
    return(
       <div className={s.main}>
           <div className={s.submain}>
         <BsArrowLeft className={s.arrow} onClick={back}/>

         
            <div className={s.container}>
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
      
                  <div style={{display: 'flex', width: '90%'}}>
                  <div className={s.boxClient}>
                  <BsPersonPlus className={s.iconPerson}/>
                  <div>
                  <h4 className={s.title}>Cliente</h4>
                  <h3>{detalle.name}</h3>
                  </div>
                  </div>
      
                  <div className={s.boxClient} >
                  <GiRoundTable className={s.iconPerson}/>
                  <div className={s.boxTable}>
                      <h4 className={s.title}>N. Mesa</h4>
                      <h3>{detalle.table}</h3>
                  </div>
                  </div>
                  </div>
      
                  <div className={s.boxClient}>
                  <BsTelephonePlus className={s.iconPerson}/>
                  <div >
                      <h4 className={s.title}>Telefono</h4>
                      <h3>{detalle.telefono}</h3>
                  </div>
                  </div>
      
                  </div>
                  </div>
                  <BsArrowLeft onClick={back} className={s.arrow2}/>
               <div className={s.subcontainer2}>
                 
                     <div >
                         {
                            detalle.items ? detalle.items.map((item,i) => {
                                return(
                                  <div key={i} className={s.items}>
                                  <h4 className={s.title}>{item.quantity} x</h4>
                                  <h4>{item.title}</h4>
                                  <h4>ARS{item.unit_price}</h4>
                              </div>
                                )
                             }) : <Spinner/>
                         }
      
                     </div>
                     {
                         detalle.comentarios && <div className={s.boxItems}>
                         <h4>{detalle.comentarios}</h4>
                     </div>
                     }
        <div className={s.radio}>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleCheck}
        value={statusFood}
       
      >
        <FormControlLabel value="Entregado"     control={<Radio />} label="Entregado" />
        <FormControlLabel value="En Prep..."    control={<Radio />} label="En Preparacion" />
      </RadioGroup>
        </div>
                   

      <div className={s.boxTotal}>
          <h3>Total</h3>
          <h4><CurrencyFormat value={detalle.monto} displayType={'text'} thousandSeparator={true} prefix={'ARS'} /></h4>
      </div>
      <h4 className={s.cancel} onClick={cancel}>Cancelar</h4>
    </div>
  </div>
    
  </div> 
          
</div>
</div>
    )
}
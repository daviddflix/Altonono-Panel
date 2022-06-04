import {  useEffect } from 'react'
import s from './modal.module.css'
import { useHistory, useParams } from 'react-router-dom';
import { getDetails } from '../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {BsArrowLeft} from 'react-icons/bs'
import {BsPersonPlus} from 'react-icons/bs'
import {GiRoundTable} from 'react-icons/gi'
import {BsTelephonePlus} from 'react-icons/bs'
import CurrencyFormat from 'react-currency-format'

export default function Detail (){

    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory()

    const detalle = useSelector(state => state.detalle)

     console.log('detalle', detalle)

    useEffect( () => {
       dispatch(getDetails(id))
    }, [id, dispatch])

    const back = () => {
        history.push('/search')
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
                            detalle.items && detalle.items.map((item,i) => {
                                return(
                                  <div key={i} className={s.items}>
                                  <h4 className={s.title}>{item.quantity} x</h4>
                                  <h4>{item.title}</h4>
                                  <h4>ARS{item.unit_price}</h4>
                              </div>
                                )
                             })
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
       </div>
    )
}
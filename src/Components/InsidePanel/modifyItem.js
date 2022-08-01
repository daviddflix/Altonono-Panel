import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ModalContext from "../../context/modalContext";
import { getProductDetail, updateFullItem } from "../../Redux/actions";
import Spinner from "../spinner/spinner";
import s from './modify.module.css'
import Button from '@mui/material/Button'
import {BsArrowLeft} from 'react-icons/bs'
import { Alert, TextField } from "@mui/material";
import Swal from 'sweetalert2'

export default function ModifyItem (){

     const {id} = useParams();
     const history = useHistory();
     const dispatch = useDispatch();
     const productByid = useSelector(state => state.productByid);
     const {variables} = useContext(ModalContext);
     const windowlength = window.matchMedia("(max-width:700px)");

     useEffect( () => {
        dispatch(getProductDetail(id))
     }, [id, dispatch])
    
  
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

    const back = () => {
      history.goBack()
    }

    const intialValues = { title: "", unit_price: "", id: id,
    description: "" };
 
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };

      const handleItem = () => {
        if(formValues.title && formValues.unit_price){
            dispatch(updateFullItem(formValues))
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto Actualizado',
            showConfirmButton: false,
            timer: 1500
            })
        }
     }


      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
      };
   
     
    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
        if (!values.title) {
          errors.title = "No puede estar vacio!";
        } 
    
        if (!values.unit_price) {
          errors.unit_price = "No puede estar vacio!";
        } 
    
        return errors;
      };

      useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            handleItem()
    
        }
      }, [formErrors, isSubmitting]);

    return(
        <div className={s.maincontainer} style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less} >
           {
            productByid.title? 
            <div className={s.container}>
                <BsArrowLeft onClick={back} className={s.arrowLeft}/>
                <form onSubmit={handleSubmit} className={s.subcontainer}>
                     <div className={s.containerInput}>
                    <TextField className={s.input} focused label='Producto' placeholder={productByid.title} onChange={handleChange} name="title" value={formValues.title}/>
                    {formErrors.title &&  <Alert severity="error">{formErrors.title}</Alert>}
                    </div>
                     <div  className={s.containerInput}>
                     <TextField className={s.input} focused label='Categoria' readOnly value={productByid.category_id}/>
                    </div>
                     <div  className={s.containerInput}>
                     <TextField className={s.input} focused label='Descripcion' placeholder={productByid.description} onChange={handleChange} name="description" value={formValues.description}/>
                    </div>
                     <div  className={s.containerInput}>
                     <TextField type='number' className={s.input} focused label='Precio' placeholder={`${'$'}${productByid.unit_price}`} onChange={handleChange} name="unit_price" value={formValues.unit_price}/>
                    {formErrors.unit_price && <Alert severity="error">{formErrors.unit_price}</Alert>}
                    </div>
                <Button type='submit' className={s.save} variant="contained">Guardar</Button>
                </form>
            </div> :
            <div className={s.containerSpinner}><Spinner/></div>
           }
        </div>
    )
}
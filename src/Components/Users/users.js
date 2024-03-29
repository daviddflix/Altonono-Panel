import { useContext, useEffect, useState } from "react";
import ModalContext from "../../context/modalContext";
import s from './user.module.css'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {FaUsers} from 'react-icons/fa'
import { NavLink, useHistory } from "react-router-dom";
import { Alert, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import {IoArrowBackOutline} from 'react-icons/io5'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createUser, getAllUser } from "../../Redux/actions";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import {FaUserAlt} from 'react-icons/fa'
import CurrencyFormat from 'react-currency-format';
import moment from 'moment'

export default function Users(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
   
    const users = useSelector(state => state.users)
    const history = useHistory();
    const dispatch = useDispatch();
    const date = moment().format('l')
 
    useEffect(() => {
       dispatch(getAllUser())
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

      const create = () => {
        history.push('/create')
      }


    return( 
        <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less}  className={s.main}>
            <div className={s.submain}>
                <div onClick={create} className={s.header}>
                     <button className={s.btn}>CREAR CAMARERA</button>
                </div>
                <div className={s.containerUsers}>
                    {
                        users.length > 0 ? users.map(p => {
                            const filterByDate = p.payments.length > 0 ? p.payments.filter(p => p.date === date) : 0
                            const filterByDateWithoutCancelation = filterByDate === 0  || filterByDate === [] ? 0 : filterByDate.filter(p => p.status === "Pedido Finalizado")
                            const filterByDateWithoutInvitation = filterByDateWithoutCancelation === 0  ? 0 : filterByDateWithoutCancelation.filter(p => p.method !== "Invitacion")
                            const arraytotal = filterByDateWithoutInvitation === 0  ? 0 : filterByDateWithoutInvitation.map(p => p.monto);
                            const total = arraytotal === 0 ? 0 : arraytotal.reduce((a,b) => a + b, 0)

                            return(
                               <Card total={total} id={p.id} key={p.name} name={p.name}/>
                            )
                        }) : <div className={s.noUsers}>
                            <FaUsers className={s.usersIcons}/>
                            <h3>No Hay usuarios creados</h3>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

function Card({name, id, total }){
    return(
        <NavLink to={`/createComanda/${id}`}  className={s.container}>
            <FaUserAlt className={s.moneyIcon}/>
            <div className={s.containerName}>
            <CurrencyFormat className={s.total} value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                <h3 className={s.name}>{name}</h3>
            </div>
      </NavLink>
    )
   
}




export function CreateUser(){

    const {variables} = useContext(ModalContext);
    const windowlength = window.matchMedia("(max-width:700px)");
    const history = useHistory();
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState( {
        name: '', 
        lastname: '', 
        role: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };

      const handleItem = () => {
        if(formValues.name && formValues.role){
            dispatch(createUser(formValues))
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'creacion exitosa',
            showConfirmButton: false,
            timer: 1500
            })
            history.push('/create')
        }
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
      };
   
     
    const validate = (values) => {
        let errors = {};
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    
        if (!values.name) {
          errors.name = "No puede estar vacio!";
        } 
        if (!values.lastname) {
          errors.lastname = "No puede estar vacio!";
        } 
        if (!values.role) {
          errors.role = "No puede estar vacio!";
        } 
    
        return errors;
      };

      useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            handleItem()
    
        }
      }, [formErrors, isSubmitting]);
   

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
       <div style={windowlength.matches === false? variables.toggle === true? styles.length : styles.moreLength : styles.less}  >
           <div className={s.submain}>
            <IoArrowBackOutline onClick={goback} className={s.iconback}/>
              <form onSubmit={handleSubmit} className={s.maincontainerInputs}>
                <div  className={s.containerInput}>
                   <TextField className={s.input} name='name'  onChange={handleChange}  label='Nombre'  value={formValues.name}/>
                </div>
                {formErrors.name && <Alert severity="error">{formErrors.name}</Alert>}
                <div  className={s.containerInput}>
                   <TextField className={s.input} name='lastname' onChange={handleChange}  label='Apellido'  value={formValues.lastname}/>
                </div>
                {formErrors.lastname && <Alert severity="error">{formErrors.lastname}</Alert>}
                <div  className={s.containerInput}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formValues.role}
                        label="Role"
                        onChange={handleChange}
                        className={s.input}
                        name='role'
                        placeholder="Role"
                    >
                        <MenuItem value={'Mozo'}>Camarero</MenuItem>
                        <MenuItem value={'Mozo'}>Camarera</MenuItem>
                    </Select>
                   {/* <TextField className={s.input} name='role' onChange={handleChange}  label='Role'  value={formValues.role}/> */}
                </div>
                {formErrors.role && <Alert severity="error">{formErrors.role}</Alert>}
                 <Button type='submit' className={s.btncrear}   variant="contained">crear usuario</Button>
              </form>
           </div>
           
       </div>
    )
}
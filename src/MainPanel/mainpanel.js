import s from './mainpanel.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { accessAdmin, updateLogin } from '../Redux/actions';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import img from '../Assets/descarga-removebg-preview.png'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button'

const MainPanel = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const admin = useSelector(state => state.admin)
   

    useEffect(()=> {
        document.title='Panel Admin'
    })

    useEffect(() => {
         dispatch(accessAdmin())
    }, [dispatch])

  const intialValues = { mail: "", password: "" };
 

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 


  const submit = async () => {
    setFormValues({ mail: "", password: "" });
    if(formValues.mail === admin[0].email && formValues.password === admin[0].password){
      dispatch(updateLogin(true))
      history.push('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrecta!',
      
      })
    }
  };


  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.mail) {
      errors.mail = "No puede estar vacio";
    } else if (!regex.test(values.mail)) {
      errors.mail = "Formato Invalido";
    }

    if (!values.password) {
      errors.password = "No puede estar vacio";
    } else if (values.password.length < 4) {
      errors.password = "contraseña debe ser mayor a 4 caracteres";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit()

    }
  }, [formErrors, isSubmitting]);

  return (
    <div className={s.main}>
    <div className={s.container}>
       
      <div className={s.box1}>
      <img src={img} alt='logo' className={s.logo} />
      <h2 style={{color:'#fff', margin: '1rem'}}>Altonono</h2>

   <form onSubmit={handleSubmit} noValidate> 
     <div className={s.boxInput}>
       <label className={s.label} htmlFor="mail">Email</label>
       <input
         className={s.input} 
         type="mail"
         name="mail"
         id="mail"
         value={formValues.mail}
         onChange={handleChange}
         placeholder='Ingresa tu email'
       />
       {formErrors.mail && <span className={s.span}>{formErrors.mail}</span>}
     </div>

     <div className={s.boxInput}>
       <label className={s.label} htmlFor="password">Password</label>
       <input
         className={s.input}
         type="password"
         name="password"
         id="password"
         value={formValues.password}
         onChange={handleChange}
         placeholder='Ingresa tu contraseña'
       />
       {formErrors.password && <span className={s.span}>{formErrors.password}</span>}
     </div>

     <Button variant='contained' style={{width: '98%'}} type='submit'>Iniciar sesion</Button>
   </form>
    <NavLink to={'/restore'} className={s.restore}>Recuperar contraseña</NavLink>
      </div>
    </div>
 </div>
  );
};

export default MainPanel;
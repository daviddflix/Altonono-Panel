import s from './mainpanel.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AccessAdmin, accessAdmin, updateLogin } from '../Redux/actions';
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import img from '../Assets/descarga-removebg-preview.png'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button'
import {GoPerson} from 'react-icons/go'
import {HiLockClosed} from 'react-icons/hi'
import { SpinnerTiny } from '../Components/spinner/spinner';

const MainPanel = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const isLogin = useSelector(state => state.isLogin)
   

    useEffect(()=> {
        document.title='Panel Admin'
    })

  

  const intialValues = { mail: "", password: "" };
 

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false)


  const submit = async () => {
    dispatch(accessAdmin({email: formValues.mail, password: formValues.password}))
     setLoading(true)
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

// useEffect(() => {
//   isLogin === false && setLoading(false)
// })
console.log('isLogin', isLogin)
console.log('loading', loading)

  return (
    <div className={s.main}>
    <div className={s.container}>
       
      <div className={s.box1}>
      <img src={img} alt='logo' className={s.logo} />
      <h2 style={{color:'#fff', margin: '1rem'}}>Altonono</h2>

   <form className={s.form} onSubmit={handleSubmit} noValidate> 
     <div className={s.boxInput}>
      <GoPerson className={s.iconPerson}/>
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
      <HiLockClosed className={s.iconPerson}/>
       <label className={s.label} htmlFor="password">Contraseña</label>
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

     <Button variant='contained' style={{width: '50%'}} type='submit'>Iniciar Sesion</Button>
   </form>
    <NavLink to={'/restore'} className={s.restore}>Recuperar contraseña</NavLink>
      </div>
    </div>
 </div>
  );
};

export default MainPanel;
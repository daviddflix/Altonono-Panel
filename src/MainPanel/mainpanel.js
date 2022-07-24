import s from './mainpanel.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { accessAdmin } from '../Redux/actions';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import img from '../Assets/descarga-removebg-preview.png'

const MainPanel = () => {

   const dispatch= useDispatch()
    useEffect(()=> {
        document.title='Panel Admin'
    })
  const intialValues = { mail: "", password: "" };
 

  

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 
   const history = useHistory()
  const admin = useSelector(state => state.admin)
 console.log('is', history)

  const submit = async () => {
   dispatch(accessAdmin(formValues))
    setFormValues({ mail: "", password: "" });
    if(admin === false){
      history.push('/')
    } 
    if(admin === true){
      history.push('/dashboard')
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
    if(admin === true){
      history.push('/dashboard')
    }
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.mail) {
      errors.mail = "Cannot be blank";
    } else if (!regex.test(values.mail)) {
      errors.mail = "Invalid mail format";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
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
       {formErrors.mail && <span>{formErrors.mail}</span>}
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
       {formErrors.password && <span>{formErrors.password}</span>}
     </div>

     <button className={s.button} type="submit">Log In</button>
   </form>
      </div>
    </div>
 </div>
  );
};

export default MainPanel;
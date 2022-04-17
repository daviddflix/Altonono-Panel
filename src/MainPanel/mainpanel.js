import s from './mainpanel.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { accessAdmin } from '../Redux/actions';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import swal from 'sweetalert'
import InsidePanel from '../Components/InsidePanel/insidepanel';

const MainPanel = () => {

   const dispatch= useDispatch()
    useEffect(()=> {
        document.title='Panel Admin - DeViaje.com'
    })
  const intialValues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [loading, setLoading] = useState(true);
  const history = useHistory()
  const admin = useSelector(state => state.admin)
  console.log(admin)
  const submit = async () => {

   dispatch(accessAdmin(formValues))
    setFormValues({ email: "", password: "" });
      
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

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
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
    !admin? <div className={s.main}>
    <div className={s.container}>
        <h1 className={s.title}>Panel Admin</h1>
      <div className={s.box1}>
      <h2 style={{color:'rgb(47,69,80)', margin: '1rem'}}>Enter your Admin Credential</h2>

   <form onSubmit={handleSubmit} noValidate>
     <div className={s.boxInput}>
       <label htmlFor="email">Email</label>
       <input
         className={s.input}
         type="email"
         name="email"
         id="email"
         value={formValues.email}
         onChange={handleChange}
       />
       {formErrors.email && <span>{formErrors.email}</span>}
     </div>

     <div className={s.boxInput}>
       <label htmlFor="password">Password</label>
       <input
         className={s.input}
         type="password"
         name="password"
         id="password"
         value={formValues.password}
         onChange={handleChange}
       />
       {formErrors.password && <span>{formErrors.password}</span>}
     </div>

     <button className={s.button} type="submit">Sign In</button>
   </form>
      </div>
    </div>
 </div> : <InsidePanel/>
  );
};

export default MainPanel;
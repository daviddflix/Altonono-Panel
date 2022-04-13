import s from './payments.module.css'
import { useEffect } from 'react'

export default function Payments(){


     useEffect(() => {
          document.title = 'Payments - DeViaje.com'
     })


     return(
      <div className={s.main}>
         <div className={s.maincontainer}>      
        
         <h1>Payments</h1>
       
       </div>
      </div>
     )
}
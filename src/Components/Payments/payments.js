import s from './payments.module.css'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../spinner/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { paymentDetail } from '../../Redux/actions';

const columns = [
     { field: 'id', headerName: 'ID', width: 30 },
     { field: 'Name', headerName: 'Name', width: 130 },
     { field: 'Email', headerName: 'Email', width: 210 },
     { field: 'Address', headerName: 'Address', width: 190 },
     { field: 'State', headerName: 'State', width: 130 },
     { field: 'CP', headerName: 'CP', width: 130 },
     { field: 'Ticket_Price', headerName: 'Ticket Price', width: 130 },
   ];  

export default function Payments(){


     useEffect(() => {
          document.title = 'Payments - DeViaje.com'
     })


     const dispatch = useDispatch()
    
    const payments = useSelector(state => state.payments)
  

     useEffect(()=> {
       dispatch(paymentDetail())
     }, [dispatch])

     


     

    //  useEffect(()=> {
    //   const fetchPayments = async () => {
    //     try {
    //     const res = await fetch('https://deviaje.herokuapp.com/getclientdetails')
    //    const data = await res.json()
    //    setPayments(data)
      
    //    } catch (error) {
    //       console.log('fetchPayments', error)
    //     }
    //   }
    //   fetchPayments()
    //  }, [])
        
       const trim = payments?.map(p => {
         return{
          Name: p?.name,
          Email: p?.mail,
          Address: p?.address.line1,
          id: p?.id,
          CP: p?.address.postal_code,
          State: p?.address.state,
          Ticket_Price: p?.monto
         }
       })

     return(
      <div className={s.main}>
        <div className={s.container}>
        <h1 className={s.title}>Payments</h1>
        <div className={s.grid}>
      
        <DataGrid
        rows={payments.length===0? <Spinner/> : trim }
        columns={columns}
        disableSelectionOnClick
     /> 
      
    
    </div>
        </div>
      </div>
     )
}
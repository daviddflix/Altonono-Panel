import s from './payments.module.css'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../spinner/spinner';

const columns = [
     { field: 'id', headerName: 'ID', width: 70 },
     { field: 'Name', headerName: 'Name', width: 130 },
     { field: 'Email', headerName: 'Email', width: 130 },
     { field: 'Address', headerName: 'Address', width: 130 },
     { field: 'Payment Method', headerName: 'Payment Method', width: 130 },
   ];  

export default function Payments(){


     useEffect(() => {
          document.title = 'Payments - DeViaje.com'
     })


     const [payments, setPayments] = useState([])
    console.log('payments', payments)


     

     useEffect(()=> {
      const fetchPayments = async () => {
        try {
        const res = await fetch('https://deviaje.herokuapp.com/getclientdetails')
       const data = await res.json()
       setPayments(data)
       console.log(data)
       } catch (error) {
          console.log('fetchPayments', error)
        }
      }
      fetchPayments()
     }, [])
        
       const trim = payments?.map(p => {
         return{
          Name: p?.name,
          Email: p?.email,
          Address: p?.address,
          id: p?.id,
         }
       })

     return(
      <div className={s.main}>
        <div className={s.container}>
        <h1 className={s.title}>Payments</h1>
        <div className={s.grid}>
      {
        payments.length === 0 ? <Spinner/> : <DataGrid
        rows={trim}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
     /> 
      }
    
    </div>
        </div>
      </div>
     )
}
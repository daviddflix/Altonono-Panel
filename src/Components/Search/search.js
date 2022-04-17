import { useEffect, useState } from 'react'
import s from './search.module.css'
import {IoSearchOutline} from 'react-icons/io5'
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../spinner/spinner';

export default function Search(){

    const [value, setValue] = useState('')

    const handleInput = (e)=> {
        setValue(e.target.value)
    }

    useEffect(() => {
        document.title = 'Search - DeViaje.com'
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

      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 130 },
        { field: 'Email', headerName: 'Email', width: 130 },
        { field: 'Address', headerName: 'Address', width: 130 },
      ]; 
      
      
   

    return(
        <div className={s.main}>

            <div className={s.container}>

            <h1 className={s.title}>Search</h1>
                

            <div className={s.boxInput}>
                <input className={s.input} type='text' placeholder='search by client name' value={value} onChange={handleInput}/>
                <IoSearchOutline className={s.icon}/>
            </div>

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
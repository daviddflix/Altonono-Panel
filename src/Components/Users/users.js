import s from './users.module.css'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/actions';    
import Spinner from '../spinner/spinner';


const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'Username', headerName: 'Username', width: 90 }, 
  { field: 'Email', headerName: 'Email', width: 180 },
  { field: 'Birthday', headerName: 'Birthday', width: 130 },
  { field: 'City', headerName: 'City', width: 120 },
  { field: 'State', headerName: 'State', width: 90 },
  { field: 'PhoneNumber', headerName: 'PhoneNumber', width: 120 },
  { field: 'DNI', headerName: 'DNI', width: 90 },
  { field: 'Points', headerName: 'Points', width: 90 },
];    

export default function Users(){

    const dispatch = useDispatch()
    
    const clients = useSelector(state => state.users)
    
     useEffect(() => {
          document.title = 'Clients - DeViaje.com'
     })

     useEffect(()=> {
       dispatch(getUsers())
     }, [dispatch])

     

    //  useEffect(()=> {
    //   const fetchUsers = async () => {
    //     try {
    //     const res = await fetch('https://deviaje.herokuapp.com/getusers')
    //    const data = await res.json()
    //    setUsers(data) 
    //    } catch (error) {
    //       console.log('fetchUsers', error)
    //     }
    //   }
    //   fetchUsers()
    //  }, [])
        
       const trim = clients?.map(p => {
         return{
          Birthday: p?.birthday,
          Email: p?.mail,
          Username: p?.username,
          id: p?.id,
          City: p?.city,
          State: p?.state,
          PhoneNumber: p?.phonenumber,
          DNI: p?.dni,
          Points: p?.points,
         }
       })
      

     return(
      <div className={s.main}>
        <div className={s.container}>
        <h1 className={s.title}>Clients</h1>
        <div className={s.grid}>
      
      <DataGrid
        rows={clients.length===0? <Spinner/> : trim }
        columns={columns}
        disableSelectionOnClick
     />
      
    
    </div>
        </div>
      </div>
     )
}  





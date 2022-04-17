import s from './clients.module.css'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/actions';
import Spinner from '../spinner/spinner';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Username', headerName: 'Username', width: 210 },
  { field: 'Email', headerName: 'Email', width: 210 },
  { field: 'Birthday', headerName: 'Birthday', width: 130 },
];    

export default function Clients(){

  
    const [users, setUsers] = useState([])
    console.log('users', users)

     useEffect(() => {
          document.title = 'Clients - DeViaje.com'
     })

     

     useEffect(()=> {
      const fetchUsers = async () => {
        try {
        const res = await fetch('https://deviaje.herokuapp.com/getusers')
       const data = await res.json()
       setUsers(data)
       console.log(data)
       } catch (error) {
          console.log('fetchUsers', error)
        }
      }
      fetchUsers()
     }, [])
        
       const trim = users?.map(p => {
         return{
          Birthday: p?.birthday,
          Email: p?.mail,
          Username: p?.username,
          id: p?.id,
         }
       })
       console.log('trim', trim)

     return(
      <div className={s.main}>
        <div className={s.container}>
        <h1 className={s.title}>Clients</h1>
        <div className={s.grid}>
      {
        users.length === 0 ? <Spinner/> : <DataGrid
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





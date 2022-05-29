import s from './users.module.css'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/actions';    
import Spinner from '../spinner/spinner';


const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'Nombre', headerName: 'Nombre', width: 100 }, 
  { field: 'Email', headerName: 'Email', width: 180 },
  { field: 'Numero', headerName: 'Numero', width: 120 },
  { field: 'zona', headerName: 'Zona', width: 90 },
  { field: 'Direccion', headerName: 'Direccion', width: 110 },
  
];    

export default function Users(){

    const dispatch = useDispatch()
    
    const clients = useSelector(state => state.users)
    
     useEffect(() => {
          document.title = 'Clientes'
     })

     useEffect(()=> {
       dispatch(getUsers())
     }, [dispatch])

        
       const trim = clients?.map(p => {
         return{
          Email: p?.email,
          Nombre: p?.name,
          id: p?.id,
          Numero: p?.phonenumber,
          zona: p?.zona,
          Direccion: p?.address,
         }
       })
      

     return(
      <div className={s.main}>
        <div className={s.container}>
        <h1 className={s.title}>Clientes</h1>
        <div className={s.grid}>
      
      <DataGrid
        rows={clients.length===0? <Spinner/> : trim }
        columns={columns}
       
     />
      
    
    </div>
        </div>
      </div>
     )
}  





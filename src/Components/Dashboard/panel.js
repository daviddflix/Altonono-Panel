import s from './dashboard.module.css'
import { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {MdPayment} from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../spinner/spinner'

export default function Dashboard(){

     const [users, setUsers] = useState([])

useEffect(() => {
     document.title = 'Dashboard - DeViaje.com'
})

const columns = [
     { field: 'id', headerName: 'ID', width: 70 },
     { field: 'Username', headerName: 'Username', width: 130 },
     { field: 'Email', headerName: 'Email', width: 130 },
     { field: 'Birthday', headerName: 'Birthday', width: 130 },
     
   ];
   
   const rows = [
     { id: 1, Username: '', Email: '', Birthday: ''  },
     { id: 2, Username: '', Email: '', Birthday: '' },
    
   ];

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

   return(
        <div className={s.main}>
              <div className={s.maincontainer}>      
        
               <h1 className={s.title}>Dashboard</h1>
                
               <div className={s.box1}>
               <h3 className={s.box_title}>At a Glance</h3>
                  <div className={s.containerIcons}>
                  <NavLink to='/payments' className={s.link}>
                <MdPayment className={s.icon}/>
                  payments
               </NavLink>

               <NavLink to='/clients' className={s.link}>
                   <FaUser className={s.icon}/>
                  Clients
               </NavLink>
                  </div>
               </div>

               <div className={s.box2}>
                    <h3 className={s.box_title}>Activity</h3>
                    <h6 style={{padding:'10px', fontSize:'13px'}}>New Clients</h6>
                    <div style={{ height: 200, width: '100%' }}>
                    
                        <DataGrid
                         rows={trim}
                         columns={columns}
                         pageSize={2}
                         rowsPerPageOptions={[2]}
                         checkboxSelection
                         disableSelectionOnClick
                         />
                         
                    </div>
               </div>   
        
            </div>
        </div>
      )
}   

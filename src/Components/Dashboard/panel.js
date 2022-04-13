import s from './dashboard.module.css'
import { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {MdPayment} from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid';

export default function Dashboard(){

useEffect(() => {
     document.title = 'Dashboard - DeViaje.com'
})

const columns = [
     { field: 'id', headerName: 'ID', width: 70 },
     { field: 'firstName', headerName: 'First name', width: 130 },
     { field: 'lastName', headerName: 'Last name', width: 130 },
     {
       field: 'age',
       headerName: 'Age',
       type: 'number',
       width: 90,
     },
     {
       field: 'fullName',
       headerName: 'Full name',
       description: 'This column has a value getter and is not sortable.',
       sortable: false,
       width: 160,
       valueGetter: (params) =>
         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
     },
   ];
   
   const rows = [
     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
   ];

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
                         rows={rows}
                         columns={columns}
                         pageSize={2}
                         rowsPerPageOptions={[2]}
                        
                         />
                    </div>
               </div>   
        
            </div>
        </div>
      )
}   

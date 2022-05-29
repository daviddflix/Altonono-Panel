import s from './dashboard.module.css'
import { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {MdPayment} from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPagos, getAllUsers } from '../../Redux/actions'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Dashboard(){

  const history = useHistory() 
  const dispatch = useDispatch()
  const cookies = new Cookies() 
  console.log(cookies.get('mail'))
  console.log(cookies.get('password'))
  
  
  const pagos = useSelector(state => state.pagos)
  const users = useSelector(state => state.users)
console.log('users', users)

  const handleLogOut = () => {
     cookies.remove('mail', {path:'/'})
     cookies.remove('password', {path:'/'})
      history.push('/')
  }
   
useEffect(() => {
     document.title = 'Dashboard'
})


useEffect(()=> {
  dispatch(getAllPagos())
  dispatch(getAllUsers())
}, [dispatch])

 
 const amount = pagos.map(p => p.monto)
 const netAmount = amount.reduce((a,b) => a + b, 0)
 

const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'Username', headerName: 'Username', width: 90 }, 
  { field: 'Email', headerName: 'Email', width: 210 },
  { field: 'Birthday', headerName: 'Birthday', width: 130 },
  { field: 'City', headerName: 'City', width: 120 },
  { field: 'State', headerName: 'State', width: 90 },
  { field: 'PhoneNumber', headerName: 'PhoneNumber', width: 120 },
  { field: 'DNI', headerName: 'DNI', width: 90 },
  { field: 'Points', headerName: 'Points', width: 90 },
     
   ];
   
       
      // const trim = users?.map(p => {
      //   return{
      //     Birthday: p?.birthday,
      //     Email: p?.mail,
      //     Username: p?.username,
      //     id: p?.id,
      //     City: p?.city,
      //     State: p?.state,
      //     PhoneNumber: p?.phonenumber,
      //     DNI: p?.dni,
      //     Points: p?.points,
      //    }
      // })

   return(
        <div className={s.main}>
              <div className={s.maincontainer}>      
             <Button variant="outlined" className={s.button} onClick={handleLogOut}>Log out</Button>
               <h1 className={s.title}>Dashboard</h1>
                
               <div className={s.box1}>
               <h3 className={s.box_title}>At a Glance</h3>
                  <div className={s.insidebox}>

                  <div className={s.containerIcons}>
                  <NavLink to='/payments' className={s.link}>
                <MdPayment className={s.icon}/>
                  Pagos
               </NavLink>

               <NavLink to='/clients' className={s.link}>
                   <FaUser className={s.icon}/>
                 Clientes
               </NavLink>
                  </div>

                  <div className={s.graphbox}>
                     <div className={s.graph}>
                     <span className={s.graphTitle}>Total</span>
                     <p className={s.index}>${nFormatter(netAmount)}</p>
                    </div>

                     <div className={s.graph}>
                     <span className={s.graphTitle}>Clientes</span>
                     <p className={s.index}>{users.length}</p>
                    </div>

                  </div>
                  </div>
               </div>

               <div className={s.box2}>
                    <h3 className={s.box_title}>Pedidos recientes</h3>
                    <div style={{ height: 230, width: '100%' }}>
                    
                        {/* <DataGrid
                         rows={0}
                         columns={0}
                         pageSize={2}
                         rowsPerPageOptions={[2]}
                         disableSelectionOnClick
                         /> */}
                         
                    </div>
               </div>   
        
            </div>
        </div>
      )
}   



function nFormatter(num) {
  if (num >= 1000000000) {
     return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')} G`;
  }
  if (num >= 1000000) {
     return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')} M`;
  }
  if (num >= 1000) {
     return `${num / 1000} `
  }
  return num;
}
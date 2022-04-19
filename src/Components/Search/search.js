import { useEffect, useState } from 'react'
import s from './search.module.css'
import {IoSearchOutline} from 'react-icons/io5'
import { DataGrid } from '@mui/x-data-grid';
import Spinner from '../spinner/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getPassangers } from '../../Redux/actions';

export default function Search(){

    const [value, setValue] = useState('')
    const passangers = useSelector(state => state.passangers)
    const dispatch = useDispatch()
    const handleInput = (e)=> {
        setValue(e.target.value)
    }

    useEffect(() => {
        document.title = 'Search - DeViaje.com'
   })

    const handleSearch = (e) => {
      e.preventDefault();
      dispatch(getPassangers(value))
    }
  
   
   
    console.log(passangers)

    useEffect(() => {
      dispatch(getPassangers())
    }, [dispatch])
    
    const trim = passangers?.map(p => {
      return{
       Name: p?.name,
       lastname: p?.lastname,
       Country: p?.country,
       DNI: p?.document,
       id: p?.id,
       birthday: p?.birthday,
      }
    })

      const columns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'Name', headerName: 'Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'Country', headerName: 'Country', width: 130 },
        { field: 'DNI', headerName: 'DNI', width: 130 },
        { field: 'birthday', headerName: 'Birthday', width: 130 },
      ]; 
      
      
   

    return(
        <div className={s.main}>

            <div className={s.container}>

            <h1 className={s.title}>Search</h1>
                

            <div className={s.boxInput}>
                <input className={s.input} type='text' placeholder='search by client name' value={value} onChange={handleInput}/>
                <IoSearchOutline className={s.icon} onClick={(e) => handleSearch(e)}/>
            </div>

            <div className={s.grid}>
                  {
              passangers.length === 0 ? <Spinner/> : <DataGrid
              rows={trim}
              columns={columns}
              disableSelectionOnClick
          /> 
            }
                    </div>
            </div>
        </div>
    )
}
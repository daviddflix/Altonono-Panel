import { useEffect, useState } from 'react'
import s from './search.module.css'
import {IoSearchOutline} from 'react-icons/io5'
import { DataGrid } from '@mui/x-data-grid';

export default function Search(){

    const [value, setValue] = useState('')

    const handleInput = (e)=> {
        setValue(e.target.value)
    }



    useEffect(() => {
        document.title = 'Search - DeViaje.com'
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

            <div className={s.container}>

            <h1 className={s.title}>Search</h1>
                

            <div className={s.boxInput}>
                <input className={s.input} type='text' value={value} onChange={handleInput}/>
                <IoSearchOutline className={s.icon}/>
            </div>

            <div className={s.grid}>
                         <DataGrid
                         rows={rows}
                         columns={columns}
                         pageSize={6}
                         rowsPerPageOptions={[6]}
                        
                         />
                    </div>
            </div>
        </div>
    )
}
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import s from './insidepanel.module.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Admin',
    headerName: 'Admin',
    width: 150,
    editable: true,
  },
  {
    field: 'Email',
    headerName: 'Email',
    type: 'email',
    width: 210,
    editable: true,
  },
  {
    field: 'Company',
    headerName: 'Company',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    // width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, Admin : 'David', Email: 'deviajepuntocom12@gmail.com', Company: 'Deviaje.com'},
];

export default function InsidePanel() {
  return (
    <div className={s.main}>
        <div style={{ height: 200, width: '90%', position:'relative', left:'2rem', top:'3rem'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[1]}
       
        disableSelectionOnClick
      />
    </div>
    </div>
  );
}
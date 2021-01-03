import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

// import './tablebody.css';

const columns = [
    { field: 'id', headerName: 'ALL', width: 160 },
    { field: 'firstName', headerName: 'NAME', width: 260 },
    { field: 'lastName', headerName: 'DO DATE', width: 260 },
    {
        field: 'TASKS',
        headerName: 'TASKS',
        width: 160,
    },

    {
        field: 'ALLTEAM',
        headerName: 'ALL TEAM',
        type:'string',
        // sortable: false,
        width: 200,

    },
    {
        field: 'STATUS',
        headerName: 'STATUS',
        type: 'number',
        width: 160,
    },
  
];

const rows = [
    { id: 1, firstName: 'rachel', lastName: '14 Feb 2019', TASKS: '148 / 148',  },
    { id: 2, firstName: 'malka', lastName: '14 Feb 2019', TASKS: '0 / 148' },
    { id: 3, firstName: 'sara', lastName: '14 Feb 2019', TASKS: '148 / 148' },
    { id: 4, firstName: 'david', lastName: '14 Feb 2019', TASKS: '148 / 148' },
    { id: 5, firstName: 'shalom', lastName: '14 Feb 2019', TASKS: '148 / 148' },
    { id: 6, firstName: 'chaim', lastName: '14 Feb 2019', TASKS: '14 / 19' },
    { id: 7, firstName: 'meir', lastName: '14 Feb 2019', TASKS: '8 / 8' },
    { id: 9, firstName: 'noa', lastName: '14 Feb 2019', TASKS: '8 / 14' },
];
 

export default function TableBody() {
    return (

        <div style={{ height: 400, width: '100%' }}>
 


            <DataGrid rows={rows} 
            
             columns={columns} pageSize={5} checkboxSelection />
           
      
        </div>
    );
}
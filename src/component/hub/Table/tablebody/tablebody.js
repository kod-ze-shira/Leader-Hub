import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

// import './tablebody.css';
export default function TableBody() {
  const malka=<img src=  { require("../../../img/ana.png") }></img>   
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
        type:'File',
        // sortable: false,
        width: 200,

    },
    {
        field: 'STATUS',
        headerName: 'STATUS',

        width: 160,
    },
    

  
];

const rows = [
    { id: 2, firstName: 'malka', lastName: '14 Feb 2019', TASKS: '0 / 148', ALLTEAM: 'img', STATUS:' Processing 80%'},
    { id: 3, firstName: 'sara', lastName: '14 Feb 2019', TASKS: '148 / 148', ALLTEAM: 'img' , STATUS:'Completed 100%' },
    { id: 4, firstName: 'david', lastName: '14 Feb 2019', TASKS: '148 / 148', ALLTEAM: 'img', STATUS: 'Completed 80%'},
    { id: 5, firstName: 'shalom', lastName: '14 Feb 2019', TASKS: '148 / 148', ALLTEAM: 'img', STATUS: 'Completed 100%' },
    { id: 6, firstName: 'chaim', lastName: '14 Feb 2019', TASKS: '14 / 19', ALLTEAM: 'img', STATUS: 'Completed 40%' },
    { id: 7, firstName: 'meir', lastName: '14 Feb 2019', TASKS: '8 / 8', ALLTEAM: 'img', STATUS: 'Completed 60%' },
    { id: 9, firstName: 'noa', lastName: '14 Feb 2019', TASKS: '8 / 14', ALLTEAM: 'img', STATUS: 'Completed 90%'},
    { id: 9, firstName: 'noa', lastName: '14 Feb 2019', TASKS: '8 / 14', ALLTEAM: 'img', STATUS: 'Completed 90%' },
];
  return (

        <div style={{ height: 400, width: '100%' }}>
         

         
          <DataGrid rows={rows} 
            
             columns={columns} pageSize={5} checkboxSelection  />
            
         
           
      
        </div>
    );
}
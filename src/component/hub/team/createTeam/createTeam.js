import React from 'react';
import star from '../.././../img/1star-solid.png'
import './createTeam.css'
export default function CreateTeam(){

  return (
     <>
     <div className='row txt_your_team_list pb-3 pt-3 pl-4'>Create team</div>
     <div className='row pt-5'>
         <div className='col-2'>
            <img src={star}></img>
         </div>
         <div className='col-9'>
             <input className='input_name_new_team'></input>
         </div>
     </div>
     <div className='row'>
         <div className='col'>
         <input className='input_name_new_team'></input>

         </div>
     </div>

     </>
  )  
}
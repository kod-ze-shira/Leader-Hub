import React from 'react'
export default function ViewTeam(props){
    return(
        <>
        <div className='row'>
            <div className='col-1'>
                <img referrerpolicy="no-referrer" src={props.team.logo}></img></div>
            <div className='col-9'>{props.team.name}</div>
        </div>
        </>
    )
}
import React from 'react'
import './teamView.css'

export default function ViewTeam(props) {
    return (
        <>
            <div className='row row_team pt-2' onClick={() => props.addTeamToShare(props.team)}>
                <div className='col-1 div_icon_team'>
                    {/* <img referrerpolicy="no-referrer" src={props.team.logo}></img></div> */}
                </div>
                <div className='col-9 my-auto team_name'>
                {props.team.name}
                </div>
               
            </div>
        </>
    )
}
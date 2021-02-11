
import React, { useState } from 'react'
import './teamView.css'

export default function TeamView(props) {


    return (
        <>
            {props.imgTeam ?
                <img className={'imgTeam ' + props.marginTeam} src={props.imgTeam}></img>
                :
                <span className={'imgTeam ' + props.marginTeam} >{props.numberTeams}</span>
            }
            {/* <img className='imgTeam' src={require('../../img/1LM (1).jpg')}></img> */}

        </>
    )
}


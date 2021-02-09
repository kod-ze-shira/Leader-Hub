
import React from 'react'
import "./letterLogo.css";

export default function LetterLogo(props) {
    return (
        <>

            <span className='logoW'>{props.nameWorkspace ?
                props.nameWorkspace[0].toUpperCase() : null}
                {
                    props.nameWorkspace && props.nameWorkspace.indexOf(" ") && props.nameWorkspace.indexOf(" ") + 1 ?
                        props.nameWorkspace[props.nameWorkspace.indexOf(" ") + 1].toUpperCase() : null
                }</span>



        </>)

}
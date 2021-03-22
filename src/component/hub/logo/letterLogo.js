
import React from 'react'
import "./letterLogo.css";

export default function LetterLogo(props) {
    return (
        <>

            <span className='logoW' style={{ "backgroundColor": props.nameWorkspace.color }} >{props.nameWorkspace.name ?
                props.nameWorkspace.name[0].toUpperCase() : null}
                {
                    props.nameWorkspace.name && props.nameWorkspace.name.indexOf(" ") && props.nameWorkspace.name.indexOf(" ") + 1 ?
                        props.nameWorkspace.name[props.nameWorkspace.name.indexOf(" ") + 1].toUpperCase() : null
                }
                </span>



        </>)

}
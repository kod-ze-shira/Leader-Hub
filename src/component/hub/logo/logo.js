
import React from 'react'
import "./logo.css";
import DropDownWorkspace from '../dropDownWorkspace/dropDownWorkspace'
import LetterLogo from './letterLogo'
export default function Logo(props) {
    return (
        <>

            <LetterLogo nameWorkspace={props.nameWorkspace} />

            {/* <span className='logoW'>{props.nameWorkspace ?
                props.nameWorkspace[0].toUpperCase() : null}
                {
                    props.nameWorkspace && props.nameWorkspace.indexOf(" ") && props.nameWorkspace.indexOf(" ") + 1 ?
                        props.nameWorkspace[props.nameWorkspace.indexOf(" ") + 1].toUpperCase() : null
                }</span> */}
            {/* <span className='textLogo'>{props.nameWorkspace}</span> */}
            <DropDownWorkspace nameWorkspace={props.nameWorkspace} />

        </>)

}
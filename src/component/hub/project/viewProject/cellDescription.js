import React, { useState } from 'react'
import './cellDescription.css'

export default function CellDescription(props) {


    return (
        <>
            <span className='description'>{props.description}</span>
        </>
    )
}


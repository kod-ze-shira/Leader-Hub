import React, { useState } from 'react'
import './cell.css'

export default function Cell(props) {


    return (
        <>
            <span className='item'>{props.item ? props.item : null}</span>
            <span className='description'>{props.description}</span>
        </>
    )
}


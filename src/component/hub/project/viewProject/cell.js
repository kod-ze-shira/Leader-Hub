import React from 'react'
import './cell.css'

export default function Cell(props) {


    return (
        <>
            <span className='item'>{props.item ? props.item : null}</span>
        </>
    )
}


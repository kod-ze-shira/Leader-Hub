import React from 'react'
import './cell.css';


export default function Cell(props) {

    return (
        <>
            <span class="item">{props.item}</span>
            <span class="description">{props.description}</span>
        </>
    )

}
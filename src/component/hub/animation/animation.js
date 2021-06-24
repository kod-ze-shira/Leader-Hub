import React from 'react'
import './animation.css'

export default function Animation(props) {
    fun()
    function fun() {
        setTimeout(() => {
            props.show(false)
        }, 2000);

    }
    return (
        <>
            <img className='animationRocketShip' src={require('../../img/Group 19471.svg')} />‏
        </>
    )

}

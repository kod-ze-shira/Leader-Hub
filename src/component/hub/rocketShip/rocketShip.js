import React from 'react'
import './rocketShip.css'

export default function RocketShip(props) {
    fun()
    function fun() {
        setTimeout(() => {
            props.show(false)
        }, 800);

    }
    return (
        <>
            <div className='divRocketShip'>
                <img className='rocketShip' src={require('../../img/Group 19471.svg')} />
            </div>‏
        </>
    )

}

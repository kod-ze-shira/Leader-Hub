import React from 'react'
import './rocketShip.css'

export default function RocketShip(props) {
    fun()
    function fun() {
        setTimeout(() => {
            props.show(false)
        }, 1000);

    }
    return (
        <>
            <div className='divRocketShip'>
                <img className='rocketShip' src={require('../../img/Group 19471.svg')} />
            </div>‏
        </>
    )

}

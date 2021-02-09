import React from 'react'
import './animation.css'
import $ from 'jquery'
export default function Animation(props) {
    fun()
    function fun() {
        setTimeout(() => {
            $('.rocketShip').css('display', 'none')
        }, 3000);
    }
    return (
        <>

            <img className='rocketShip' src={require('../../img/done.png')}></img>‏


        </>
    )

}

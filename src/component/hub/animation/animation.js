import React from 'react'
import './animation.css'
import $ from 'jquery'

export default function Animation(props) {
    fun()
    function fun() {
        setTimeout(() => {
            $(".rocketShip").remove();
            // $('.rocketShip').css('display', 'none')
        }, 3000);

    }
    return (
        <>

            <img className='rocketShip' src={require('../../img/Group 19471.svg')}></img>‏
            {/* <i class="far fa-trash-alt"></i> */}
        </>
    )

}

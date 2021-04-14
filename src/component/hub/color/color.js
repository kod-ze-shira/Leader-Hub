
import React from 'react'
import { CirclePicker } from 'react-color'
import './color.css'
import $ from 'jquery'

export default function Colors(props) {
    const colors = ['#FD80E5', '#6236FC', '#40D9ED',
        '#6DD400', '#F88C20', '#F0D923', '#F26B9C', '#8580FD'

    ]
    $("#colour").change(function (event) {
        console.log($(this).val());
        $("#color_front").css('background-color', $(this).val());
    });

    $("#color_front").click(function (event) {
        $("#colour").click();
    });
    // const circleSize="14";

    return (
        <>
            <div>
                <CirclePicker circleSize={18} onChangeComplete={(color) => { props.changeStatusColor({ value: color.hex, name: "color" }) }} colors={colors} />
                {/* <span id="color_front"></span>
                <input type='color'  class='bar' id='colour'/>            </div> */}
                <img src={require('../../img/ID.svg')}></img>
            </div>
        </>
    )
}
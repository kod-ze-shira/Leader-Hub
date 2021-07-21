
import React from 'react'
import { CirclePicker } from 'react-color'
import './color.css'
import $ from 'jquery'
import { SketchPicker } from 'react-color';


export default function
    ColorWorkspace(props) {
    const colors = ['#FD808B', '#F13B7F', '#F84A20',
        '#F88C20', '#F8B520', '#F0D923', '#BFD41F',
        '#42C153', '#44D7B6',
        '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#FD80E5'
    ]

    $("#colour").change(function (event) {
        console.log($(this).val());
        $("#color_front").css('background-color', $(this).val());
    });

    $("#color_front").click(function (event) {
        $("#colour").click();
    });
    function stopP(event) {
        event.stopPropagation();
    }
    function handleChange(color) {
        props.setColorWorkspace(color)
    }

    return (
        <>
            {colors.map((color, index) => {

                return <>
                    <label className="select-color-workspace" onClick={(e) => handleChange(color)} style={{ "backgroundColor": color }}></label>
                </>
            })} <div className="add-color-workspace">+
                <input onChange={(e) => handleChange(e.target.value)} type="color" />
            </div>
        </>
    )
}
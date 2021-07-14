import React from 'react'
import { connect } from 'react-redux'
import './tries.css'

function Tries(props) {
    return (
        <div class="div-table">
            <div class="div-table-row">
                <div class="div-table-col" align="center">Customer ID</div>
                <div class="div-table-col">Customer Name</div>
                <div class="div-table-col">Customer Address</div>
            </div>
            <div class="div-table-row">
                <div class="div-table-col">001</div>
                <div class="div-table-col">002</div>
                <div class="div-table-col">003</div>
            </div>
            <div class="div-table-row">
                <div class="div-table-col">xxx</div>
                <div class="div-table-col">yyy</div>
                <div class="div-table-col">www</div>
            </div>
            <div class="div-table-row">
                <div class="div-table-col">ttt</div>
                <div class="div-table-col">uuu</div>
                <div class="div-table-col">Mkkk</div>
            </div>

        </div>
    )
}

export default connect()(Tries)
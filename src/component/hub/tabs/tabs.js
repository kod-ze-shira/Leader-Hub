import React, { useState, useEffect, useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
// import './projectPlatform.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToastDelete from '../toastDelete/toastDelete1';


function Tabs(props) {

    useEffect(() => {
        {

        };
    }, []);


    return (
        <>
            <div className="body container-fluid">

            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {


    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
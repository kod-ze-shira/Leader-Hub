import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import './uploadFile.css'


function AllTasks(props) {

    useEffect(() => {
    }, [])








    return (
        <>
        </>
    )
}
export default connect(
    (state) => {
        return {
            files: state.files_reducer.files
        }
    },
    (dispatch) => {
        return {
            setFileFromTask: (file) => dispatch(actions.setFileFromTask(file)),
            addFile: (files) => dispatch(actions.addFile(files)),
        }
    }
)(AllTasks)
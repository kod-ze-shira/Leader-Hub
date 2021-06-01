import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import './uploadFile.css'

function UploadFile(props) {
    const fileInputRef = useRef()
    useEffect(() => {
        console.log(props);
    }, [props.files])

    const uploadMulti = () => {
        if (fileInputRef.current.files) {
            
            props.setFileFromTask(fileInputRef.current.files[0])
        }
    }

    return (
        <div className='divFile'>
            <label for="logouug" className="lbl_img">
                <span className='spanUploadFileNew'>
                </span>
            </label>
            <input
                type={"file"}
                id="logouug"
                htmlFor="myInput"
                accept="image/*"
                style={{
                    display: 'none',
                    cursor: 'pointer',
                }}
                ref={fileInputRef}
                // multiple
                onChange={() => uploadMulti()}
            />
            <div id='myFile'></div>
        </div>
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
)(UploadFile)
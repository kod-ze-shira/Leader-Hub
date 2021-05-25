import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import File from './file/file'
import './uploadFile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function UploadFile(props) {
    const [uploadFile, setUploadFile] = useState([])
    const fileInputRef = useRef()
    useEffect(() => {
        console.log(props);
    }, [props.files])



    const uploadMulti = () => {
        // const [file] = fileInputRef.current.files[0]
        // if (file) {
        //     blah.src = URL.createObjectURL(file)
        // }
        if (fileInputRef.current.files) {
            props.setFileFromTask(fileInputRef.current.files[0])


        }
    }




    // const saveFiles = () => {
    // }
    return (
        <div className='divFile'>
            <label for="logouug" className="lbl_img">
                {/* <p>add file</p> */}
                <span className='spanUploadFileNew'>

                </span>
                {/* <img className="img_logo" 
                    referrerpolicy="no-referrer"
                     src={props.user && props.user.imgLogo == "" ? logo1 : props.user.imgLogo} /> */}
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
            {/* <button onClick={saveFiles}>save</button> */}
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
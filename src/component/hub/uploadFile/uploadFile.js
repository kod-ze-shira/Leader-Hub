import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import File from './file/file'
import './uploadFile.css'


function UploadFile(props) {
    const [uploadFile, setUploadFile] = useState([])
    const fileInputRef = useRef()
    const [fileComponentArr, setFileComponentArr] = useState([])
    useEffect(() => {
        console.log(props);
    }, [props.files])



    const uploadMulti = () => {
        // setUploadFile([...uploadFile, file])

        // let r = fileInputRef.current.file
        if (fileInputRef.current.files) {
            props.setFileFromTask(fileInputRef.current.files[0])
            // for (let index = 0; index < fileInputRef.current.files.length; index++) {
            // if (!uploadFile)
            //     setUploadFile([...fileInputRef.current.files[0]]);
            // else
            //     setUploadFile([...uploadFile, fileInputRef.current.files[0]])


            // let newComponent = addFileComponent(fileInputRef.current.files[0].name, fileInputRef.current.files[0].name)
            // if (!fileComponentArr.length)
            //     setFileComponentArr([newComponent])
            // else
            //     setFileComponentArr([...fileComponentArr, newComponent])


        }
    }




    // const saveFiles = () => {
    // }
    return (
        <div className='divFile'>
            <label for="logouug" className="lbl_img">
                <p>add file</p>
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
            {fileComponentArr}
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
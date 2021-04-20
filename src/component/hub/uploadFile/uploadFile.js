import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { uploadFiles } from '../../../redux/middleware/filesCrud'

function UploadFile(props) {
    const [uploadFile, setUploadFile] = useState([])

    const [saveInServer, setSaveInServer] = useState(false)
   
    useEffect(() => {
        console.log(props);
        // props.uploadFiles(props.files)
    }, [props.files])

    const uploadMulti = (file) => {

        // setUploadFile([...uploadFile, file])
        props.addFile(file)
        console.log(props)

    }

    const saveFiles = () => {
        // setSaveInServer(true)
        props.uploadFiles(uploadFile)

    }
    return (
        <div>
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
                onChange={(e) => uploadMulti(e.target.files[0])}
            />
            <button onClick={saveFiles}>save</button>
            <button onClick={() => props.getFiles()}>get</button>
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
            uploadFiles: (filesArr) => dispatch(actions.uploadFiles(filesArr)),
            // getFiles: () => dispatch(actions.getFiles()),
            addFile: (files) => dispatch(actions.addFile(files)),
        }
    }
)(UploadFile)
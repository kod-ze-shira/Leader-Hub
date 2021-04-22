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
        props.uploadFiles(props.files)
    }, [props.files])



    const uploadMulti = () => {
        // setUploadFile([...uploadFile, file])
        debugger
        let r = fileInputRef.current.file
        if (fileInputRef.current.files.length) {

            for (let index = 0; index < fileInputRef.current.files.length; index++) {
                if (!uploadFile)
                    setUploadFile([...fileInputRef.current.files[index]]);
                else
                    setUploadFile([...uploadFile, fileInputRef.current.files[index]])


                let newComponent = addFileComponent(fileInputRef.current.files[index].name, fileInputRef.current.files[index].name)
                if (!fileComponentArr.length)
                    setFileComponentArr([newComponent])
                else
                    setFileComponentArr([...fileComponentArr, newComponent])


            }
        }


        // document.getElementById('myFile').innerText += 
        // if (!uploadFile)
        // setUploadFile([file])
        // else
        // setUploadFile([...uploadFile, file])

        // props.addFile(file)
        // console.log(props)

    }


    const addFileComponent = (urlFile, nameFile) => {
        return <File urlFile={urlFile} nameFile={nameFile} />
    }
    // function deleteFile2() {
    //     alert('delete file')
    // }

    const saveFiles = () => {
        // setSaveInServer(true)

        props.uploadFiles(uploadFile)

    }
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
            <button onClick={saveFiles}>save</button>
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
            addFile: (files) => dispatch(actions.addFile(files)),
        }
    }
)(UploadFile)
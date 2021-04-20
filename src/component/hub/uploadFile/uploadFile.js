import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import File from './file/file'

function UploadFile(props) {
    const [uploadFile, setUploadFile] = useState([])
    const [uploadFile1, setUploadFile1] = useState([])
    const fileInputRef = useRef()
    const [saveInServer, setSaveInServer] = useState(false)
    const [fileComponent, setFileComponent] = useState([])
    useEffect(() => {
        console.log(props);
        // props.uploadFiles(props.files)
    }, [props.files])



    const uploadMulti = () => {
        // setUploadFile([...uploadFile, file])
        if (fileInputRef.current.files.length) {

            for (let index = 0; index < fileInputRef.current.files.length; index++) {
                if (!uploadFile1)
                    setUploadFile1([...fileInputRef.current.files[index]]);
                else
                    setUploadFile1([...uploadFile1, fileInputRef.current.files[index]])


                let fileComponent2 = fileComponent1(fileInputRef.current.files[index].name, fileInputRef.current.files[index].name)

                if (!fileComponent.length)
                    setFileComponent([fileComponent2])
                else
                    setFileComponent([...fileComponent, fileComponent2])

                // let div = document.createElement("div");
                // let deleteFile = document.createElement('button')
                // deleteFile.innerText = 'X'
                // deleteFile.name = 'fileInLocal'
                // deleteFile.setAttribute('onclick', (e) => deleteFile1(e));

                // deleteFile.addEventListener("click", deleteFile2);

                // div.appendChild(deleteFile);
                // deleteFile.onclick = deleteFile2();

                // div.innerHTML += fileInputRef.current.files[index].name
                // this.setState({
                //     users: [...this.state.users, <User />]
                //   })
                // let element = document.getElementById('myFile')
                // element.appendChild(fileComponent);
            }
        }


        // document.getElementById('myFile').innerText += 
        // if (!uploadFile1)
        // setUploadFile1([file])
        // else
        // setUploadFile1([...uploadFile1, file])

        // props.addFile(file)
        // console.log(props)

    }


    const fileComponent1 = (urlFile, nameFile) => {
        return <File urlFile={urlFile} nameFile={nameFile} />
    }
    // function deleteFile2() {
    //     alert('delete file')
    // }

    const saveFiles = () => {
        // setSaveInServer(true)
        props.uploadFiles(uploadFile1)

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
                ref={fileInputRef}
                multiple
                onChange={() => uploadMulti()}
            />
            <div id='myFile'></div>
            {fileComponent}
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
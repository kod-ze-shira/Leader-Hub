import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import './uploadFile.css'
import imageCompression from "browser-image-compression";

function UploadFile(props) {
    const fileInputRef = useRef()
    useEffect(() => {
        console.log(props);
      

    }, [])

    const compressedFile = async (myFiles) => {

        let compressedFile;
        let compressedFiles = [];

        await Promise.all(
            myFiles.map(async (file) => {
                if (file.file.type.includes("image")) {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    compressedFile = await imageCompression(file.file, options);

                    console.log(
                        `compressedFile size ${compressedFile.size / 1024} MB`
                    );
                } else {
                    compressedFile = file.file;
                }
                compressedFiles.push(compressedFile)

            })
        )

        return compressedFiles
    }

    const uploadMulti = async () => {
        
        if (fileInputRef.current.files) {
            props.setFileFromTask(fileInputRef.current.files[0])
            let file = [{
                'url': 'new',
                'name': fileInputRef.current.files[0].name,
                'file': fileInputRef.current.files[0],
                'size': fileInputRef.current.files[0].size
            }]
            file = await compressedFile(file)
            let task = {}, type
            if (props.taskId == '') {
                task = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]
                type = 'task'
            }
            else {
                task = props.tasks.filter((task) => task._id == props.taskId)
                type = 'taskNotBelong'

            }
            props.uploadFiles({ 'files': file, 'task': task, type: type })



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
                // accept="image/*"
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
            files: state.files_reducer.files,
            cards: state.public_reducer.cards,
            indexCurrentCard: state.public_reducer.indexCurrentCard,
            indexCurrentTask: state.public_reducer.indexCurrentTask,
            tasks: state.public_reducer.tasks,

        }
    },
    (dispatch) => {
        return {
            setFileFromTask: (file) => dispatch(actions.setFileFromTask(file)),
            addFile: (files) => dispatch(actions.addFile(files)),
            uploadFiles: (file) => dispatch(actions.uploadFiles(file)),
            setCurrentIndexTask: (index) => dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
            setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),

        }
    }
)(UploadFile)
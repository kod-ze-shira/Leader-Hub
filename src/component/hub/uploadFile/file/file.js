
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './file.css'
import { actions } from '../../../../redux/actions/action'

function File(props) {

    const [file, setFile] = useState()
    useEffect(() => {

        if (props.file.url == 'new' && props.file) {
            setFile(URL.createObjectURL(props.file.file))
        }

    }, [props.file])
    function deleteFile() {
        props.removeFileInRedux({ 'name': props.file.name, 'url': props.file.url })
    }
    function downloadFile(e) {
        // e.stopPropagation()
        props.downloadFile(props.file)
        // props.showViewDetails(true)
    }
    return (
        <>
            <div className=' fileInTask  mb-3 row' id={props.file.url ? props.file.url : props.file.name}>
                <div className='col-4 displayInlineBlock imgFileInTask'>
                    {props.file.url != 'new' ?
                        <a href={props.file.url} target="_blank">
                            <img src={props.file.url}></img></a> :
                        <img src={file}></img>}
                </div>
                <div className='col-8 displayInlineBlock nameFileAndAction'>
                    <span className='nameFileInTask'>
                        {props.file.url != 'new' ?
                            <a href={props.file.url} target="_blank" style={{ 'color': '#358A8D' }}>{props.file.name}</a>
                            : props.file.name}
                    </span>
                    {/* <div> */}
                    <FontAwesomeIcon onClick={() => deleteFile()} className='mr-1 ml-1' style={{ float: 'right' }}
                        icon={['fas', 'trash-alt']}
                    ></FontAwesomeIcon>
                    {props.file.url != 'new' ?
                        <FontAwesomeIcon className='downloadFileInTask' onClick={(e) => downloadFile(e)}
                            icon={['fa', 'download']} style={{ float: 'right' }}
                        ></FontAwesomeIcon>
                        : null}
                    {/* </div> */}
                </div>
            </div>




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
            downloadFile: (file) => dispatch(actions.downloadFile(file)),
            removeFileInRedux: (filesArr) => dispatch(actions.removeFileInRedux(filesArr)),
            deleteFilesInTask: (filesArr) => dispatch(actions.deleteFilesInTask(filesArr)),
        }
    }
)(File)
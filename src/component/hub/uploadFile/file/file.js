
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

    return (
        <>
            <div className='divFile' style={{ 'display': 'inline-block' }} id={props.file.url ? props.file.url : props.file.name}>

                <FontAwesomeIcon icon={["fa", "trash-alt"]} onClick={() => deleteFile()} />
                {props.file.url != 'new' ?
                    <a href={props.file.url} target="_blank">{props.file.name}</a>
                    : <p>{props.file.name}</p>
                }

                {props.file.url != 'new' ?
                    <img className="menu-open-close imgInFile" src={props.file.url}></img>
                    :
                    <img className="menu-open-close imgInFile" src={file}></img>
                }
                <FontAwesomeIcon icon={["fas", "download"]} onClick={() => props.downloadFile(props.file)} />
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
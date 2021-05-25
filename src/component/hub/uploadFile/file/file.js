
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './file.css'
import { actions } from '../../../../redux/actions/action'
import ReactDOM from 'react-dom'

function File(props) {
    const [file, setFile] = useState(null)
    useEffect(() => {

        if (props.url == 'new' && props.file)
            setFile(URL.createObjectURL(props.file.file))
    }, [props.file])
    function deleteFile() {
        props.removeFileInRedux({ 'name': props.name, 'url': props.url })
    }
    function downloadFile(e) {
        props.downloadFile({ 'url': props.url, 'name': props.name, 'e': e })
        e.stopPropagation()
    }
    return (
        <>
            <div className=' fileInTask ml-3 mb-3 ' id={props.url ? props.url : props.name}>
                {props.url != 'new' ?
                    <a href={props.url} target="_blank"> <img className="imgFileInTask" src={props.url}></img></a> :
                    <img className="imgFileInTask" src={file}></img>}
                {/* blah.src = URL.createObjectURL(file) */}

                <span className='nameFileInTask'>
                    {props.url != 'new' ?
                        <a href={props.url} target="_blank" style={{ 'color': '#358A8D' }}>{props.name}</a>
                        : props.name}
                </span>
                {/* <FontAwesomeIcon className=''
                    icon={['fas', 'trash-alt']}
                ></FontAwesomeIcon> */}
                <FontAwesomeIcon onClick={() => deleteFile()} className='mr-1 ml-1' style={{ float: 'right' }}
                    icon={['fas', 'trash-alt']}
                ></FontAwesomeIcon>
                {props.url != 'new' ?
                    <FontAwesomeIcon className='downloadFileInTask' onClick={(e) => downloadFile(e)}
                        icon={['fa', 'download']} style={{ float: 'right' }}
                    ></FontAwesomeIcon>
                    : null}
            </div>

            {/* <div className='col-5' style={{ 'display': 'inline-block' }}
                id={props.url ? props.url : props.name}>
                <button onClick={() => deleteFile()} >X</button>
                {props.url != 'new' ?
                    <a href={props.url} target="_blank">{props.name}</a>
                    : <p>{props.name}</p>
                }
            </div> */}
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
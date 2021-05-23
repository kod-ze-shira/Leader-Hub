
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './file.css'
import { actions } from '../../../../redux/actions/action'

function File(props) {

    function deleteFile() {
        // alert('delete file')
        props.removeFileInRedux({ 'name': props.name, 'url': props.url })


        // props.deleteFilesInTask([url])
        // props.removeFile([props.url])

        // props.removeFile('https://files.codes/uploads/renana-il/img/1618920248226__ת.ז. יהודה עם ספח נשוי.JPG')

        // document.getElementById(props.urlFile).remove()
    }

    return (
        <>
            <div className='col-6 fileInTask' id={props.url ? props.url : props.name}>
                <img className="imgFileInTask" src={props.url}></img>
                <span className='nameFileInTask'>{props.name}</span>
                {/* <FontAwesomeIcon className=''
                    icon={['fas', 'trash-alt']}
                ></FontAwesomeIcon> */}
                <FontAwesomeIcon onClick={() => deleteFile()} className='mr-1 ml-1'
                    icon={['fas', 'trash-alt']}
                ></FontAwesomeIcon>
                {props.url != 'new' ?
                    <FontAwesomeIcon className='downloadFileInTask' onClick={() => props.downloadFile(props.url)}
                        icon={['fa', 'download']}
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
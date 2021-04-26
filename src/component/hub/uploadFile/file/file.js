
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <div style={{ 'display': 'inline-block' }} id={props.url ? props.url : props.name}>
                <button onClick={() => deleteFile()} >X</button>
                {props.url != 'new' ?
                    <a href={props.url} target="_blank">{props.name}</a>
                    : <p>{props.name}</p>
                }
                {/* <FontAwesomeIcon icon={["fas", "download"]} onClick={() => props.downloadFile(props.url)} /> */}
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
            // downloadFile: (url) => dispatch(actions.downloadFile(url)),
            removeFileInRedux: (filesArr) => dispatch(actions.removeFileInRedux(filesArr)),
            deleteFilesInTask: (filesArr) => dispatch(actions.deleteFilesInTask(filesArr)),
        }
    }
)(File)
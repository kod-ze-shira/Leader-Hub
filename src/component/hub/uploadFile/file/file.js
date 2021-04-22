
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

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
                <span>{props.name}</span>
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
            removeFileInRedux: (filesArr) => dispatch(actions.removeFileInRedux(filesArr)),
            deleteFilesInTask: (filesArr) => dispatch(actions.deleteFilesInTask(filesArr)),
        }
    }
)(File)
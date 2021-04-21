
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { actions } from '../../../../redux/actions/action'

function File(props) {
    function deleteFile() {
        // alert('delete file')
        props.removeFile(props.urlFile)
        // props.removeFile('https://files.codes/uploads/renana-il/img/1618920248226__ת.ז. יהודה עם ספח נשוי.JPG')

        document.getElementById(props.urlFile).remove()
    }

    return (
        <>
            <div style={{ 'display': 'inline-block' }} id={props.urlFile}>
                <button onClick={() => deleteFile()} >X</button>
                <span>{props.nameFile}</span>
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
            removeFile: (filesArr) => dispatch(actions.removeFile(filesArr)),
        }
    }
)(File)
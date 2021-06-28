import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action.js';
import './viewFilesByCard.css'
import bin from '../../../img/bin.png'
import title from '../../../../Data/title.json'
import download from '../../../img/download.png'
import ReactTooltip from 'react-tooltip'
import ViewFile from './viewFile'
import { withRouter } from 'react-router-dom'

function viewFilesByCard(props) {


    const filesForDownload = []

    function addOrRemoveFileToArr(e, file, ref) {

        let index = 0
        filesForDownload.forEach(f => f._id == file._id ? index = f._id : null)

        if (index == 0) {
            // ref.current.checked = true
            filesForDownload.push(file)
            // props.downloadRef.current.disabled = false
            props.setCountFilesArr(filesForDownload.length)

        }
        else {
            // ref.current.checked = false
            filesForDownload.splice(index, 1)
            if (filesForDownload.length === 0)
                // props.downloadRef.current.disabled = true
                props.setCountFilesArr(0)
        }
        props.setFilesForDownload(filesForDownload)

    }

    function deleteFile() {

    }

    return (
        <>


            {props.files.length ?

                //
                <div className="container" >
                    <div class="row row-cols-4 row-cols-lg-6 g-2">
                        {props.files.map((file, index) =>
                            <ViewFile
                                file={file}
                                addOrRemoveFileToArr={addOrRemoveFileToArr}
                                fileRef={'ref' + index}
                            ></ViewFile>)}</div></div> : "there arent files"}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        FilesOfProject: state.public_reducer.filesForProjectArr,
        indexCurrentProject: state.public_reducer.indexCurrentProject
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFilesForProject: (p) => dispatch(actions.getFilesForProject(p)),
        downloadFile: (file) => dispatch(actions.downloadFile(file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(viewFilesByCard))
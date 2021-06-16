import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import FilesFolder from './filesFolder'
import download from '../../../img/download.png'
import ReactTooltip from 'react-tooltip'
import title from '../../../../Data/title.json'
import { actions } from '../../../../redux/actions/action'
import './viewFilesByCards.css'

function ViewFilesByCards(props) {

    useEffect(() => {

        console.log('useeffect');
        props.getFilesForProject(props.indexCurrentProject)

    }, [props.indexCurrentProject])
    const foldersForDownloadArr = []
    const downloadRef = useRef()
    const [ifDisabled, setIfdisabled] = useState(true)

    function addOrRemoveFolderToArr(e, folder) {
        debugger;
        let index = 0
        foldersForDownloadArr.forEach(f => f._id == folder._id ? index = f._id : null)

        if (index == 0) {
            // ref.current.checked=true
            foldersForDownloadArr.push(folder)
            downloadRef.current.disabled = false
        }
        else {
            // ref.current.checked=false 
            foldersForDownloadArr.splice(index, 1)
            if (foldersForDownloadArr.length === 0) {
                downloadRef.current.disabled = true
            }
        }
    }
    function downloadFolder(e) {

        alert('download')

        foldersForDownloadArr.forEach(folder => folder.files.forEach(file => props.downloadFile({ "file": file })))
        // filesForDownloadOrDelete.forEach(f => props.downloadFile({ "file": f }))

    }

    const renderViewFolders = () => {
        return props.FilesOfProject.map((card) =>
            <FilesFolder
                card={card}
                addOrRemoveFolderToArr={addOrRemoveFolderToArr}
            >
            </FilesFolder>)
    }
    return (
        <>
            <div className="filesForProject">
                <div className="row">
                    <h3 className="col-9" id="title">Project Files</h3>
                    <div className="col-3 row iconsList" >
                        <div className="add iconControl" ref={downloadRef} data-tip data-for="download" >
                            <img class='imageIcon' src={download} ></img>
                            <ReactTooltip data-tip id="download" place="top" effect="solid">
                                {title.title_downLoad}
                            </ReactTooltip>

                        </div>
                    </div>
                </div>
                <hr></hr>

                {props.FilesOfProject.length ?

                    //
                    <div className="container" >
                        <div class="row row-cols-4 row-cols-lg-6 g-2">
                            {renderViewFolders()}
                        </div>
                    </div> : "there arent cards"}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        FilesOfProject: state.public_reducer.filesForProjectArr
    }
}
const mapdispatchToProps = (dispatch) => {
    return {
        getFilesForProject: (p) => dispatch(actions.getFilesForProject(p)),
        downloadFile: (file) => dispatch(actions.downloadFile(file)),

    }
}

export default connect(mapStateToProps, mapdispatchToProps)(ViewFilesByCards)
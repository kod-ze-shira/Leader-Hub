import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import FilesFolder from '../filesFolder/filesFolder'
import download from '../../../../img/download.png'
import ReactTooltip from 'react-tooltip'
import title from '../../../../../Data/title.json'
import { actions } from '../../../../../redux/actions/action'
import './viewCards.css'

function ViewFilesByCards(props) {

    useEffect(() => {

        console.log('useeffect');
        props.getFilesForProject(props.indexCurrentProject)
        props.setFoldersForDownload([])
        props.setCountFoldersArr(0)

    }, [props.indexCurrentProject])
    const foldersForDownloadArr = []


    function addOrRemoveFolderToArr(e, folder) {
        // e.stopPropagation()
        let index = -1
        foldersForDownloadArr.forEach((f, i) => f.cardId == folder.cardId ? index = i : null)

        if (index == -1) {
            // ref.current.checked=true
            foldersForDownloadArr.push(folder)
            // props.downloadRef.current.disabled = false
            props.setCountFoldersArr(foldersForDownloadArr.length)

        }
        else {
            // ref.current.checked=false 
            foldersForDownloadArr.splice(index, 1)
            if (foldersForDownloadArr.length === 0) {
                // props.downloadRef.current.disabled = true
                props.setCountFoldersArr(0)

            }
        }
        props.setFoldersForDownload(foldersForDownloadArr)
    }


    const renderViewFolders = () => {
        return props.FilesOfProject.map((card) =>
            <FilesFolder
                setFiles={props.setFiles}
                setShowCards={props.setShowCards}
                card={card}
                addOrRemoveFolderToArr={addOrRemoveFolderToArr}
                setCardName={props.setCardName}
            >
            </FilesFolder>)
    }
    return (
        <>

            {props.FilesOfProject.length ?
                <div className="container" >
                    <div class="row row-cols-4 row-cols-lg-6 g-2">
                        {renderViewFolders()}
                    </div>
                </div> : "there arent cards"}
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
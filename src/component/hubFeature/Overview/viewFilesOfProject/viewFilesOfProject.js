import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import FilesFolder from './filesFolder'
import download from '../../../../assets/img/download.png'
import ReactTooltip from 'react-tooltip'
import title from '../../../../Data/title.json'
import { actions } from '../../../../redux/actions/action'
import './viewFilesOfProject.css'
import ViewCards from './viewCards'
import ViewFilesByCard from './viewFilesByCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ViewFilesOfProject(props) {


    // const downloadRef = useRef()
    const [showCards, setShowCards] = useState(true)
    const [currentFiles, setCurrentFiles] = useState([])
    const [filesForDownload, setFilesForDownload] = useState([])
    const [foldersForDownload, setFoldersForDownload] = useState([])
    const [countFilesArr, setCountFilesArr] = useState(0)
    const [countFoldersArr, setCountFoldersArr] = useState(0)
    const [cardName, setCardName] = useState('')

    useEffect(() => {

        props.getFilesForProject(props.indexCurrentProject)
    }, [])

    function downloadFile(e) {

        alert('download')

        // filesForDownload.forEach(f => props.downloadFile({ "file": f }))

    }

    function downloadFolder(e) {

        alert('download')

        // foldersForDownloadArr.forEach(folder => folder.files.forEach(file => props.downloadFile({ "file": file })))
    }
    function backToAllFiles() {
        setCardName('')
        setShowCards(true)
    }


    return (
        <>
            <div className="filesForProject">
                <div className="row">
                    <div className="col-9">
                        <p className="title" id="title" onClick={backToAllFiles}>Project Files</p>
                        {cardName ?
                            <p className="cardNameTitle">
                                <FontAwesomeIcon className="rowIcon"
                                    icon={['fas', 'chevron-left']}>
                                </FontAwesomeIcon>
                                {'      ' + cardName}</p> : ''}

                    </div>
                    <div className="col-3 row iconsList" >
                        <div className="add iconControl"
                            data-tip data-for="download" disabled={showCards ? countFoldersArr === 0 : countFilesArr === 0} onClick={showCards ? downloadFolder : downloadFile}>
                            <img class='imageIcon' src={download} ></img>
                            <ReactTooltip className="tooltip-style" data-tip id="download" place="top" effect="solid">
                                {title.title_downLoad}
                            </ReactTooltip>

                        </div>
                    </div>
                </div>
                <hr></hr>
                {showCards ?
                    <ViewCards
                        showRocketShip={props.showRocketShip}
                        setFiles={setCurrentFiles}
                        setShowCards={setShowCards}
                        setFoldersForDownload={setFoldersForDownload}
                        setCardName={setCardName}
                        showRocketShip={props.showRocketShip}
                        setCountFoldersArr={setCountFoldersArr}
                    ></ViewCards> :
                    <ViewFilesByCard
                        files={currentFiles}
                        setFilesForDownload={setFilesForDownload}
                        setCountFilesArr={setCountFilesArr}
                        setCardName={setCardName}
                    ></ViewFilesByCard>}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        FilesOfProject: state.public_reducer.filesForProjectArr,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        workspacesIndex: state.public_reducer.indexOfWorkspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFilesForProject: (p) => dispatch(actions.getFilesForProject(p)),
        downloadFile: (file) => dispatch(actions.downloadFile(file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFilesOfProject)
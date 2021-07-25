import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
// import FilesFolder from './filesFolder/filesFolder'
import download from '../../../../assets/img/download.png'
import ReactTooltip from 'react-tooltip'
import title from '../../../../Data/title.json'
import { actions } from '../../../../redux/actions/action'
import './viewFilesOfProject.css'
import ViewCards from './viewCards/viewCards'
import ViewFilesByCard from './viewFilesbyCard/viewFilesByCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import jsZip from 'jszip'
// import { downloadFolder } from '../../../../redux/middleware/filesCrud'
import JSZip from "jszip";

function ViewFilesOfProject(props) {


    // const downloadRef = useRef()
    const [showCards, setShowCards] = useState(true)
    const [currentFiles, setCurrentFiles] = useState([])
    const [filesForDownload, setFilesForDownload] = useState([])
    const [foldersForDownload, setFoldersForDownload] = useState([])
    const [countFilesArr, setCountFilesArr] = useState(0)
    const [countFoldersArr, setCountFoldersArr] = useState(0)
    const [cardName, setCardName] = useState('')
    const [ifAnimation, setIfanimation] = useState(false)

    useEffect(() => {

        props.getFilesForProject(props.indexCurrentProject)
    }, [])

    function downloadFile(e) {

        // alert('download')
        if (foldersForDownload.length > 7)
            setIfanimation(true)
        filesForDownload.forEach(f => props.downloadFile({ "file": f }))

    }

    async function downloadFolder1() {

        let file
        let zip = new JSZip();
        for (var i = 0; i < foldersForDownload[0].files.length; i++) {
            file = await fetch(foldersForDownload[0].files[i].src)
                .then(r => r.blob())
                .then(blobFile => new File([blobFile],
                    foldersForDownload[0].files[i].src.match(/.*\/(.*)$/)[1],
                    { type: "image/jpeg" }))
            zip.file(i + file.name, file);
        }
        zip.generateAsync({
            type: "base64"
        }).then(function (content) {
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = "data:application/zip;base64," + content;
            a.download = foldersForDownload[0].cardName;
            document.body.appendChild(a);
            a.click();

            // window.location.href = "data:application/zip;base64," + content;
        });

    }
    // alert('download')
    // foldersForDownload.forEach(folder => folder.files.forEach(file => props.downloadFile({ "file": file })))
    // foldersForDownload.forEach(folder => props.downloadFiles({ "folder": folder }))


    function backToAllFiles() {
        setCardName('')
        setShowCards(true)
    }
    function zipFolder(files) {

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
                                {cardName}</p> : ''}

                    </div>
                    <div className="col-3 row iconsList" >
                        <div className="add iconControl"
                            data-tip data-for="download" disabled={showCards ? countFoldersArr === 0 : countFilesArr === 0} onClick={showCards ? downloadFolder1 : downloadFile}>
                            <img className='imageIcon' src={download} ></img>
                            <ReactTooltip className="tooltip-style" data-tip id="download" place="top" effect="solid">
                                {showCards ? title.title_download_folder :
                                    title.title_downLoad
                                }
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
                        ifShow={showCards}
                    ></ViewCards> :
                    <ViewFilesByCard
                        files={currentFiles}
                        setFilesForDownload={setFilesForDownload}
                        setCountFilesArr={setCountFilesArr}
                        setCardName={setCardName}
                        ifShow={showCards}
                    ></ViewFilesByCard>}
                {ifAnimation ?
                    <div className="waitForDownload"></div> : null}
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
        downloadFiles: (files) => dispatch(actions.downloadFiles(files))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFilesOfProject)
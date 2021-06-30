import React from 'react'
import { connect } from 'react-redux'
import fullFolder from '../../../../assets/img/full-folder.png'
import emptyFolder from '../../../../assets/img/empty-folder.png'
import { withRouter } from 'react-router-dom'
import './filesFolder.css'

function FilesFolder(props) {

    const folder = props.card
    const currentProjectId = props.workspaces[props.indexWorkspace].projects[props.currentProject]._id

    function openViewFiles(e) {
        e.stopPropagation()
        props.setFiles(folder.files)
        props.setShowCards(false)
        props.setCardName(folder.cardName ? folder.cardName : "card name")
    }

    return (
        <>
            <div className="viewFolder col p-2 conteiner">
                <div className="folderItem d-flex flex-column">
                    <div className=" checkboxRow" onDoubleClick={(e) => openViewFiles(e)}>
                        <label
                            title="check folder"
                            className="selectFolder py-2 check-tabs row">
                            <input type="checkbox" onChange={(e) => props.addOrRemoveFolderToArr(e, folder)} />
                            <span
                                className="checkmarkFolder checkmarkFolder-tabs"
                            ></span>
                        </label>
                    </div>
                    <div className=" imgRow" >
                        <img className="emptyFolder" src={emptyFolder}></img>
                        <img className="fullFolder" src={fullFolder}></img>
                    </div>
                    <div className="cardName">
                        <p>{folder.cardName ? folder.cardName : "card name"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
        currentProject: state.public_reducer.indexCurrentProject,
        workspaces: state.public_reducer.workspaces,
        indexWorkspace: state.public_reducer.indexOfWorkspace
    }
}

export default connect(mapStateToProps)(withRouter(FilesFolder))
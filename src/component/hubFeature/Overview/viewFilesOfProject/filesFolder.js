import React from 'react'
import { connect } from 'react-redux'
import fullFolder from '../../../img/full-folder.png'
import emptyFolder from '../../../img/empty-folder.png'
import { withRouter } from 'react-router-dom'
import './viewFilesByCards.css'

function FilesFolder(props) {

    const folder = props.card
    const currentProjectId = props.workspaces[props.indexWorkspace].projects[props.currentProject]._id

    function openViewFiles() {
        debugger;
        props.history.push({ pathname: '/' + props.user + '/hub/projectPlatform/' + currentProjectId + '/Overview/' + folder.card, state: { files: folder.files } })
    }

    return (
        <>
            <div className="viewFolder col p-2 conteiner">
                <div className="folderItem d-flex flex-column" onClick={openViewFiles}>
                    <div className=" checkboxRow">
                        <label
                            title="check folder"
                            className="selectFolder py-2 check-tabs row">
                            <input type="checkbox" onChange={(e) => props.addOrRemoveFolderToArr(e, folder)} />
                            <span
                                className="checkmarkFolder checkmarkFolder-tabs"
                            ></span>
                        </label>
                    </div>
                    <div className=" imgRow">
                        <img className="emptyFolder" src={emptyFolder}></img>
                        <img className="fullFolder" src={fullFolder}></img>
                    </div>
                    <div className="">
                        <p>{folder.card}</p>
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
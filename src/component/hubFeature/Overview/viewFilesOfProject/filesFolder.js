import React, { useState } from 'react'
import { connect } from 'react-redux'
import fullFolder from '../../../img/full-folder.png'
import emptyFolder from '../../../img/empty-folder.png'
import { withRouter } from 'react-router-dom'
import './filesFolder.css'

function FilesFolder(props) {

    const folder = props.card


    function openViewFiles(e) {
        // if (e.target.children[0].children[0].children[0].checked)
        //     props.addOrRemoveFolderToArr(e, folder)
        props.setFiles(folder.files)
        props.setShowCards(false)
        props.setCardName(folder.cardName ? folder.cardName : "card name")
    }

    //onDoubleClick={(e) => openViewFiles(e)} onClick={(e) => openViewFiles(e)}
    return (
        <>
            <div className="viewFolder col p-2 conteiner">
                <div className="folderItem d-flex flex-column">
                    <div className=" checkboxRow" onDoubleClick={(e) => openViewFiles(e)}>
                        <label
                            title="check folder"
                            className="selectFolder py-2 check-tabs row">
                            <input type="checkbox"
                                onChange={(e) => props.addOrRemoveFolderToArr(e, folder)} />
                            <span
                                className="checkmarkFolder checkmarkFolder-tabs"
                            ></span>
                        </label>
                    </div>
                    <div className=" imgRow" onDoubleClick={(e) => openViewFiles(e)}>
                        <img className="emptyFolder" src={emptyFolder}></img>
                        <img className="fullFolder" src={fullFolder}></img>
                    </div>
                    <div className="cardDetails" onDoubleClick={(e) => openViewFiles(e)}>
                        <p className="cardName">{folder.cardName ? folder.cardName : "card name"}</p>
                        <p className="filesNumber">{folder.files.length + " files"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
    }
}

export default connect(mapStateToProps)(withRouter(FilesFolder))
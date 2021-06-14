import React from 'react'
import { connect } from 'react-redux'
import defaultFolder from '../../../img/rep.png'
import './viewFilesByCards.css'

function FilesFolder(props){

    const folder=props.card

    function openViewFiles(){
        //open the files of the card
       props.history.push('/'+props.user+'/hub/projectPlatform/'+props.indexCurrentProject+'/Overview/')
    }

    return(
        <>
        <div className="viewFolder col p-2 conteiner">
            <div className="folderItem" onClick={openViewFiles}>
            <div className="row checkboxRow">
            <label
                                    title="check folder"
                                    className="selectFolder py-2 check-tabs row">
                                    <input type="checkbox" onChange={(e)=>props.addOrRemoveFolderToArr(e,folder)} />
                                    <span
                                        className="checkmarkFolder checkmarkFolder-tabs"
                                    ></span>
          </label>
            </div>
            <div className="row imgRow">
                <img src={defaultFolder}></img>
            </div>
            <div className="row">
                <p>{props.card.cardName}</p>
            </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
    return{
        user: state.public_reducer.userName,
        currentProject:state.public_reducer.indexCurrentProject
    }
}

export default connect(mapStateToProps)(FilesFolder)
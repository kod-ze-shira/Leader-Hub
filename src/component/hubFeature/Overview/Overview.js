import React, { useState } from 'react'
import { connect } from 'react-redux'
// import viewFilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
import FilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
// import { actions } from '../../hub'
function Overview(props) {
    
    const [showFilesForProject,setShowFilesForProject]=useState(false)
    function openViewFilesForProject(e){
        setShowFilesForProject(true)
    }
    return (
        <>
            <div className=" body container-fluid">
              <button onClick={openViewFilesForProject}>files in this project</button>
              {showFilesForProject?<FilesOfProject></FilesOfProject>:null}
              
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
    
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Overview)
import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyChart from '../chart/chart'
import FilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'

function Overview(props) {
    
    const [showFilesForProject,setShowFilesForProject]=useState(false)
    function openViewFilesForProject(e){
        setShowFilesForProject(true)
    }
    return (
        <>
            <div className=" body container-fluid">
              <MyChart/>
              <button onClick={openViewFilesForProject}>files in this project</button>
              {showFilesForProject?<FilesOfProject></FilesOfProject>:null}
              
              <Hangout></Hangout>
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
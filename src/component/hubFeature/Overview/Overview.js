import React, { useState } from 'react'
import { connect } from 'react-redux'
// import viewFilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
// import { actions } from '../../hub'
function Overview(props) {
   
    return (
        <>
            <div className=" body container-fluid">
            
            <FilesOfProject></FilesOfProject>
              
             
            </div>
            {/* <Hangout></Hangout> */}
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
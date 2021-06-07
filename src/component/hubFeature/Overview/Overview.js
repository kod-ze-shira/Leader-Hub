import React, { useState } from 'react'
import { connect } from 'react-redux'
// import viewFilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
import Members from './members/members'
import ViewMembers from './members/veiwMembers/viewMembers'
// import MyChart from '../chart/chart'
// import { actions } from '../../hub'
function Overview(props) {

  
    return (
        <>
            <div className=" body container-fluid">
                <Members />
                {/* <MyChart /> */}
                 <FilesOfProject></FilesOfProject> 


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
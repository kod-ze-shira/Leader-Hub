import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyChart from './chart/chart'
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Members from './members/members'
import Hangout from './hangout/hangout'
// import { actions } from '../../hub'
function Overview(props) {

  
    return (
        <>
            <div className=" body container-fluid">
                <MyChart />
                <Members />
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
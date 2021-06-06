import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyChart from '../chart/chart'
import FilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
import Members from './members/members'
import ViewMembers from './members/veiwMembers/viewMembers'
// import { actions } from '../../hub'
function Overview(props) {

    const [showFilesForProject, setShowFilesForProject] = useState(false)
    function openViewFilesForProject(e) {
        setShowFilesForProject(true)
    }
    return (
        <>
            <div className=" body container-fluid">
<Members/>
                <MyChart />
                <button onClick={openViewFilesForProject}>files in this project</button>
                {showFilesForProject ? <FilesOfProject></FilesOfProject> : null}

                {/* <Hangout></Hangout> */}
                <ViewMembers/>
              <MyChart/>
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
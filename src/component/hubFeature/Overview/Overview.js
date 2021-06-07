import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyChart from './chart/chart'
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Members from './members/members'
import Logs from './logs/logs'
import ViewMembers from './members/veiwMembers/viewMembers'
// import { actions } from '../../hub'
function Overview(props) {

  
    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-9'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <MyChart  />
                            </div>

                            <div className='row'>
                                <FilesOfProject />
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <Members />
                            </div>
                            <div className='row'>
                                <Logs />
                            </div>
                        </div>
                    </div>
                    {/* <Hangout></Hangout> */}

                </div>


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
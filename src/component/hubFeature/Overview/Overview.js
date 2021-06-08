import React, { useState } from 'react'
import { connect } from 'react-redux'
// import viewFilesOfProject from '../viewFilesOfProject/viewFilesOfProject'
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
import Members from './members/members'
import Logs from './logs/logs'
import './overview.css'
import MyChart from '../chart/chart'
// import { actions } from '../../hub'
function Overview(props) {

  
    return (
        <>
            <div className="scrollbarOverview container-fluid">
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
                    <div className='col-3'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <Members />
                            </div>
                            <div className='row'>
                                <Logs />
                            </div>
                        </div>
                    </div>

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
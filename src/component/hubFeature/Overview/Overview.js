import React, { useState } from 'react'
import { connect } from 'react-redux'
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
import Members from './members/members'
import Logs from './logs/logs'
import './overview.css'
import MyChart from '../chart/chart'


function Overview(props) {
    return (
        <>
            <div className='scrollbarOverview container-fluid'>
                <div className='row '>
                    <div className='col-9 mr-3'>
                        <div className='container-fluid px-0 '>
                            <div className='row mb-3'>
                                <MyChart />
                            </div>
                            <div className='row'>
                                <FilesOfProject />
                            </div>
                        </div>
                    </div>

                    <div className='col' style={{ height: '87vh' }}>
                        <div className='container-fluid px-0 '>
                            <div className='row mb-3 minHeight'>
                                <Members />
                            </div>
                            <div className='row minHeight'>
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


export default Overview;
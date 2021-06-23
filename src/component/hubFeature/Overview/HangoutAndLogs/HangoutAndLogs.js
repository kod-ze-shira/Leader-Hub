import React from 'react'
import { connect } from 'react-redux'
import './HangoutAndLogs.css';
import Logs from '../logs/logs'
import Hangout from '../hangout/hangout'

function HangoutAndLogs(props) {
    return (
        <>
            <div className="body-hangoutAndLogs" >
                <div className='row mb-3 minHeight'>
                    {/* <Hangout></Hangout> */}
                </div>
                <div className='row minHeight'>
                    <Logs />
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(HangoutAndLogs)


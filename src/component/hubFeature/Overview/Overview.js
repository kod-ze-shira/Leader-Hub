import React, { useState, useEffect ,} from 'react'
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action';
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
import Members from './members/members'
import Logs from './logs/logs'
import './overview.css'
import MyChart from '../chart/chart'


function Overview(props) {

    const { idProject } = useParams();

    useEffect(() => {
        if (props.workspaces.length == 0)
            props.getAllWorkspaces()

    }, [])
    useEffect(() => {
         for (let i = 0; i < props.workspaces.length; i++) {
            let workspace = props.workspaces[i].projects.find((p) => p._id == idProject)
            if (workspace) {
                props.indexOfWorkspace(i)
                props.getAllStatusesTaskForWorkspace()
            }
        }
    }, [props.workspaces])
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
<Hangout></Hangout>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces:state.public_reducer.workspaces
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
        indexOfWorkspace: (index) => dispatch(actions.indexOfWorkspace(index)),
        getAllStatusesTaskForWorkspace:()=>dispatch(actions.getAllStatusesTaskForWorkspace()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview)


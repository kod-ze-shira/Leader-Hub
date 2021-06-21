import React, { useState, useEffect, } from 'react'
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action';
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject'
import Hangout from './hangout/hangout'
import Members from './members/members'
import Logs from './logs/logs'
import './overview.css'
import MyChart from '../chart/chart'
import Description from "./description/description";
import ViewFilesOfProject from './viewFilesOfProject/viewFilesOfProject'
// import { actions } from '../../hub'
function Overview(props) {



    const { idProject } = useParams();
    const [refresh, setRefresh] = useState(false)
    // useEffect(() => {
    //     if (props.workspaces.length == 0)
    //         props.getAllWorkspaces()

    // }, [])
    useEffect(() => {
        for (let i = 0; i < props.workspaces.length; i++) {
            let project = props.workspaces[i].projects.find((p) => p._id == idProject)
            if (project) {
                props.indexOfWorkspace(i)
                props.getAllStatusesTaskForWorkspace()
                let indexProject = props.workspaces[i].projects.findIndex(project => project._id == idProject)
                props.setCurrentIndexProject(indexProject)
            }
        }
    }, [props.workspaces])
    // useEffect(() => {

    //     if (props.indexOfCurrentWorkspace && props.workspaces.length) {
    //         setRefresh(true)
    //     }
    // }, [props.indexOfCurrentWorkspace])
    return (
        <>
            <div className='scrollbarOverview container-fluid'>

                <div className='row '>
                    <div className='col-9 mr-3'>
                        <div className='container-fluid px-0 '>
                            <div className='row mb-3'>
                                <div className='projectName' >
                                <Description></Description>
                                </div>
                                {/* {refresh ? */}
                                <>
                                    <Members />

                                    <MyChart />
                                </>
                                {/* : null} */}
                            </div>
                            <div className='row'>
                                {/* {refresh ? */}
                                <FilesOfProject />
                                {/* : null} */}
                            </div>
                        </div>
                    </div>

                    <div className='col' style={{ height: '87vh' }}>
                        <div className='container-fluid px-0 '>
                            {/* {refresh ? */}
                            <>
                                <div className='row mb-3 minHeight'>
                                    <Hangout></Hangout>
                                </div>
                                <div className='row minHeight'>
                                    <Logs />
                                </div>
                            </>
                            {/* : null} */}
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
        workspaces: state.public_reducer.workspaces,
        indexOfCurrentWorkspace: state.public_reducer.indexOfWorkspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
        setCurrentIndexProject: (index) => dispatch(actions.setCurrentIndexProject(index)),
        indexOfWorkspace: (index) => dispatch(actions.indexOfWorkspace(index)),
        getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview)


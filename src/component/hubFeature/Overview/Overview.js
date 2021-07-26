import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actions } from '../../../redux/actions/action';
import MyChart from '../chart/chart';
import Description from "./description/description";
import HangoutAndLogs from './HangoutAndLogs/HangoutAndLogs';
import Logs from './logs/logs';
import Members from './members/members';
import './overview.css';
import FilesOfProject from './viewFilesOfProject/viewFilesOfProject';
import useWindowsWidth from '../Overview/hookResize'
function Overview(props) {



    const { idProject } = useParams();
    const [refresh, setRefresh] = useState(false)
    // useEffect(() => {
    //     if (props.workspaces.length=== 0)
    //         props.getAllWorkspaces()

    // }, [])
    useEffect(() => {
        for (let i = 0; i < props.workspaces.length; i++) {
            let project = props.workspaces[i].projects.find((p) => p._id === idProject)
            if (project) {
                props.indexOfWorkspace(i)
                props.getAllStatusesTaskForWorkspace()
                let indexProject = props.workspaces[i].projects.findIndex(project => project._id === idProject)
                props.setCurrentIndexProject(indexProject)
            }
        }
    }, [props.workspaces])

    useEffect(() => {
        // props.indexOfCurrentWorkspace ||
        if (props.workspaces.length) {
            setRefresh(true)
        }
        // }, [props.indexOfCurrentWorkspace])
    }, [props.workspaces])

    const sizeScreen = useWindowsWidth(window.innerWidth);

    return (
        <>
            <div className='overview container-fluid '>

                <div className='row '>
                    <div className='col-lg-9 col-md-12 mr-3 scrollOverview'>

                        <div className='container-fluid px-0 '>
                            <div className='row mb-3 divChartAndMembers'>

                                {refresh ?
                                    <>
                                        <div className='projectName' >
                                            <Description></Description>
                                        </div>
                                        <Members />
                                        <MyChart />
                                    </>
                                    : null}
                            </div>
                        </div>

                        {/* <div className='col ' > */}
                        <div className='container-fluid px-0 '>
                            {refresh ?
                                <FilesOfProject />
                                : null}
                        </div>

                        <div className='row HangoutAndLogs d-xs-block d-lg-none'>
                            <div className='col-12'>
                                <div className='container-fluid px-0 '>
                                    {refresh ?
                                        <HangoutAndLogs></HangoutAndLogs>
                                        : null}
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    <div className='col d-xs-none d-lg-block scrollOverview mr-3'>
                        <div className='container-fluid px-0 '>
                            {refresh ?
                                <HangoutAndLogs></HangoutAndLogs>
                                : null}
                        </div>
                    </div>
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




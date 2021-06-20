import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ViewLogs from "../logs/viewLogs/viewLogs"
import '../logs/viewLogs/viewLogs.css'

function Logs(props) {
    // const [logs, setLogs] = useState()
    // useEffect(() => {
    //     if (props.workspacesIndex) {
    //         setLogs(props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs)
    //         debugger
    //     }
    // }, [props.workspacesIndex])

    let logs = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs
    console.log("🚀 ~ file: logs.js ~ line 6 ~ Logs ~ logs", logs)
    let logsReverse = logs ? logs.reverse() : null;

    const renderViewLogs = () => {
        return logs.map(log => {
            return <ViewLogs
                schemaName={log.staticLog.name}
                icon={log.staticLog.icon}
                user={log.user}
                date={log.date}
            />
        })
    }

    return (
        <>
            <div className="container backgroundWhiteAndBorderRadius">
                <div className="row mt-3 ml-2"><b>Project Log</b></div>
                <div className="mt-1 logsHeder"></div>
                <div className="row">{
                    logs.length ?
                        renderViewLogs()
                        : null
                }
                </div>
            </div>
        </>

    )

}
const mapDispatchToProps = (dispatch) => {
}

const mapStateToProps = (state) => {
    return {
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        workspaces: state.public_reducer.workspaces
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);


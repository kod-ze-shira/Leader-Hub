import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ViewLogs from "../logs/viewLogs/viewLogs"
import '../logs/viewLogs/viewLogs.css'

function Logs(props) {
    const [logs, setLogs] = useState(props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs)
    useEffect(() => {
        if (props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs) {
            setLogs(props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs)
        }
    }, [props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs])

    let logsReverse = [...logs];
    logsReverse.reverse();

    const renderViewLogs = () => {
        debugger

        if (typeof(logsReverse[0]) !== "string")
            return logsReverse.map(log => {
                return <ViewLogs
                    schemaName={log.staticLog.name}
                    icon={log.staticLog.icon}
                    user={log.user}
                    date={log.date}
                />
            })
        else
            return null;
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


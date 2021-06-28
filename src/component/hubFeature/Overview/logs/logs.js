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
    console.log("logs", logs, "projectsssssssssssssssss", props.workspaces[props.indexOfWorkspace].projects)

    let taskName = (log) => {
        // let project = props.workspaces[props.indexOfWorkspace].projects
        if (log.schemaName.includes("Task")) {
            props.cards.map((card) => {
                card.tasks.map((task) => {
                    if (task._id == log.objectId)
                        return log.objectId
                }
                )
            })
        }
    }
    const renderViewLogs = () => {

        if (typeof (logsReverse[0]) !== "string")
            return logsReverse.map(log => {
                return <ViewLogs
                    schemaName={log.staticLog.name}
                    icon={log.staticLog.icon}
                    user={log.user}
                    date={log.date}
                    _id={log._id}
                    cardName={taskName(log)}
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
    return {}
}

const mapStateToProps = (state) => {
    return {
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        workspaces: state.public_reducer.workspaces,
        cards: state.public_reducer.cards
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);


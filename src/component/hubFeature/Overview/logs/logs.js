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

    let returenProjectOrTaskName = (log) => {
        let objectName = null;
        if (log.schemaName.includes("Task")) {
            // for (let i = 0; i < props.cards.length; i++) {
            //     for (let j = 0; j < props.cards[i].tasks.length; j++) {
            //         if (props.cards[i].tasks[0]._id=== log.objectId) {
            //             objectId = log.objectId;
            //             break;
            //         }

            //     }
            //     if (objectId !== null) {
            //         break;
            //     }

            // }
            props.cards.map((card) => {
                card.tasks.map((task) => {
                    if (task._id === log.objectId) {
                        objectName = task.name
                    }

                }
                )
            })
            return objectName

        }
        else
            if (log.schemaName.includes("Project")) {
                objectName = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].name
                return objectName
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
                    projectOrTaskName={returenProjectOrTaskName(log)}
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
                <div className="">{
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


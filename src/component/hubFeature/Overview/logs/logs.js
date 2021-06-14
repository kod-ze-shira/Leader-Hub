import React from 'react';
import { connect } from 'react-redux';

function Logs(props) {
    let logs = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs
    console.log("🚀 ~ file: logs.js ~ line 6 ~ Logs ~ logs", logs)

    return (
        <>
            <div className="container backgroundWhiteAndBorderRadius">
                <div className="row"><p>Project Log</p></div>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <p>logs.staticLog.icon</p>
                        </div>
                        <div className="col-10">
                            <p>hello.....!!!!!!!!!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col ">
                            <p>stamm by stammmm</p>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    {logs.length ?
                        logs.map(l => {
                            return <ul>
                                <li>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-2 logicon">
                                                {l.schemaName}
                                            </div>
                                            <div className="col-10 logheader">
                                                <img src={l.staticLog.icon}></img>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col ">
                                                {l.user}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        })
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
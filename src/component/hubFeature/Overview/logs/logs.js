import React from 'react';
import {connect} from 'react-redux';

function Logs(props) {
    let logs=props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].logs
    console.log("lodsssssssssss ",logs);

    return (
        <>
            <div className="container backgroundWhiteAndBorderRadius">
                <div className="row">
                    {logs.length ?
                        logs.map(l => {
                           return <div className="viewMembers col-4 ">{l}</div>
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
        indexOfWorkspace:state.public_reducer.indexOfWorkspace,
        indexCurrentProject:state.public_reducer.indexCurrentProject,
        workspaces:state.public_reducer.workspaces
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);
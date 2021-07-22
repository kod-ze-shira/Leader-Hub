import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action';
function ViewProjectNew(props) {

    return (
        <>
            <div className="container">
                <div className="row" >
                    <div className="col">
                        <div>name:{props.project.name}</div>
                    
                        {/* <div>description:{props.project.description}</div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewProjectNew)

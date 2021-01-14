import React from 'react';

import './newworkspace.css';

import { connect } from 'react-redux';
import { actions } from '..//..//..//..//redux/actions/action'


function NewWorkpas(props) {
    const change = (event) => {
        props.createW(event.target.name, event.target.value)
    }


    return (

        <>
            <div className="row">

                <div className="col-md-1 col-xs-2 mt-2 Type1" style={{ color: "#707074" }}>Type</div>
                <div className="col-md-2 col-xs-2 mt-2 name" style={{ color: "#707074" }}>Name</div>
                <div className="col-md-2 col-xs-1"></div>
                <div className="col-md-2 col-xs-1 mt-2 Do1" style={{ color: "#707074" }}>Do To</div>
            </div>
            <div className="row mt-2">

                <div className="col-1 workspace" >
                    <div className="mt-2"></div>
                     workspace


                </div>



                <div className="col-md-4 col-xs-1 input_workpace">
                    <div className="mt-2"></div>
                    <input type="text"
                        id="inputTextworkpase" placeholder="Type the name of the workspace" onChange={(e) => change(e)} />
                </div>


                <div className="newdate">
                    <div className="row mt-2"></div>
                    <input type="date" id="datetask"></input>
                </div>

                <div className="col-md-2 col-xs-1 WORKSPACE1"><div className="textstart mt-2">
                    <div className="mt-2"></div>
                    <b onClick={() => { props.setWorkspaCrud(); }}>START WORKSPACE</b></div>
                </div>

            </div>
          
           
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        workspace1: state.workspace_reducer.workspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setWorkspaCrud: () => dispatch(actions.setWorkspaceCrud()),
        createW: (name, value) => dispatch(actions.setWorkspace(name, value)),
        // setWorkspaCrud: (props) => dispatch({type: 'SET_WORKSPACE_CRUD', payloud: props })



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewWorkpas)








import React from 'react';
import './newproject.css';
import { connect } from 'react-redux';
import { actions } from '..//..//..//..//redux/actions/action'

function NewProject(props) {



    const change = (event) => {
        props.createP(event.target.name, event.target.value)
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

                <div className="col-1 newproject" >
                    <div className="mt-2"></div>
                     project


                </div>



                <div className="col-md-3 input_project">
                    <div className="mt-2"></div>
                    <input type="text"
                        id="inputTextproject" placeholder="Type the name of the project" onChange={(e) => change(e)} />
                </div>


                <div className="newdate">
                    <div className="row mt-2"></div>
                    <input type="date" id="datetask"></input>
                </div>


                {/* <div className="col-md-2 col-xs-1 STARTPROJECT"><div className="textstart mt-2">
                        <div className="mt-2"></div>
                   
                   </div></div> */}
                <button onClick={() => { props.setProjectCrud1(props.project1); }}>NEW A</button>



            </div>
            <button onClick={props.setisConfiguratorOpen}>START PROJECT</button>

        </>

    );
}
const mapStateToProps = (state) => {
    return {
        // project1: state.workspace_reducer.project,
        project: state.project_reducer.project,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setisConfiguratorOpen: (isConfiguratorOpen) => dispatch(actions.setisConfiguratorOpen(isConfiguratorOpen))
        // setProjectCrud1: (props) => dispatch(actions.setProjectCrud(props)),
        // createP: (name, value) => dispatch(actions.setProject1(name, value)),
        // setWorkspaCrud: (props) => dispatch({ type: 'SET_WORKSPACE_CRUD', payloud: props })



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProject)

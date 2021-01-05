import Header from '../header';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './newproject.css';
import { connect } from 'react-redux';
import { actions } from '..//..//..//..//redux/actions/action'

function NewProject(props) {
    function backheader() {
        setproject(false);
    }
    const [project, setproject] = useState(true);
    const change = (event) => {
        debugger
        props.createP(event.target.name, event.target.value)
    }
    return (
        project ?
            <div className="headerserch">
                <div className="row">
                    <div className="col-0.5 x"><b onClick={backheader}>x</b></div>
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



                    <div className="col-md-4 col-xs-1 input_project">
                        <div className="mt-2"></div>
                        <input type="text"
                            id="inputTextproject" placeholder="Type the name of the project" onChange={(e) => change(e)} />
                    </div>


                    <div className="newdate">
                        <div className="row mt-2"></div>
                        <input type="date" id="datetask"></input>
                    </div>

                    <div className="col-md-2 col-xs-1 STARTPROJECT"><div className="textstart mt-2">
                        <div className="mt-2"></div>
                        <b >START PROJECT</b></div></div>
                    <button onClick={() => { props.setProjectCrud1(props.project1); }}>NEW A</button>


                </div>
            </div>
            : <>
                <Header />
            </>
    );
}
const mapStateToProps = (state) => {
    return {
        project1: state.workspace_reducer.project,



    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProjectCrud1: (props) => dispatch(actions.setProjectCrud(props)),
        createP: (name, value) => dispatch(actions.setProject1(name, value)),
        // setWorkspaCrud: (props) => dispatch({ type: 'SET_WORKSPACE_CRUD', payloud: props })



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProject)

import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import './newtask.css';
import Header from '../header';
import { connect } from 'react-redux';
import { actions } from '..//..//..//..//redux/actions/action'



function Newtask(props) {
    const change = (event) => {

        props.createT(event.target.name, event.target.value)
    }
    function backheader() {
        setNewtask(false);
    }
    const [Newtask, setNewtask] = useState(true);
    return (
        Newtask ?
            <div className="headerserch">

                <div className="row">
                    <div className="col-0.5 x"> <b onClick={backheader}>x</b></div>
                    <div className="col-md-1 col-xs-2 mt-2 Type1" style={{ color: "#707074" }}>Type</div>
                    <div className="col-md-2 col-xs-2 mt-2 name" style={{ color: "#707074" }}>Name</div>
                    <div className="col-md-2 col-xs-1"></div>

                    <div className="col-md-2 col-xs-1 mt-2 Do1" style={{ color: "#707074" }}>Do To</div>
                </div>
                <div className="row mt-2">

                    <div className="col-1 newtask" >
                        <div className="mt-2"></div>
                     Task <img src={require('../../../img/star-solid.png')}></img>


                    </div>



                    <div className="col-md-4 col-xs-1 input_task">
                        <div className="mt-2"></div>
                        <input type="text"
                            id="inputText" placeholder="Type the name of the task" onChange={(e) => change(e)} />
                    </div>


                    <div className="newdate">
                        <div className="row mt-2"></div>
                        <input type="date" id="datetask"></input>
                    </div>

                    <div className="col-md-2 col-xs-1 STARTtask"><div className="textstart mt-2">
                        <div className="mt-2"></div>
                        <b onClick={() => { props.setTaskCrud1(props.task1); }}>START TASK</b></div></div>

                </div>
            </div>
            :
            <>
                <Header />
            </>

    )
}
const mapStateToProps = (state) => {
    return {
        task1: state.task_reducer.task,



    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTaskCrud1: (props) => dispatch(actions.setTaskCrud(props)),
        createT: (name, value) => dispatch(actions.setTask(name, value)),
        // setWorkspaCrud: (props) => dispatch({ type: 'SET_WORKSPACE_CRUD', payloud: props })



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Newtask)
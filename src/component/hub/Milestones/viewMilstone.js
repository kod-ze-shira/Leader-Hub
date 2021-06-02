import React from 'react';
import { connect } from 'react-redux';

function viewMilstone(props) {
    return (
        <div>
            <div className="show-task row mx-4 py-1 border-bottom ">
                <img src={require("../../img/milstone.svg")}></img>
                <div className="show-card  col-3">
                    {props.milestone.name}</div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {

    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(viewMilstone)

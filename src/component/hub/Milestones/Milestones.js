import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './Milstones.css';
import ViewMilstone from './viewMilstone';

function Milestones(props) {
    const [showGif, setShowGif] = useState(true)
    useEffect(() => {
        console.log("hi");
        props.getAllMilestonesTasks()
        console.log("milestones")
        setTimeout(() => {
            setShowGif(false)
        }, 4000);

    }, [])
    const renderTasks = props.milestones.length ? props.milestones.map((milestone) => {
        return <ViewMilstone milestone={milestone} />
    }) : null

    return (
        <div className="body-workspace ">
            <div className=" row justify-content-start mill mx-4 ">
                <p className="milstoneTitle pl-3">My Milestones</p>
            </div >

            <div className="mt-5">
                {props.milestones.length ?
                    renderTasks
                    : showGif ?
                        <div className="logoGifInCards ml-5 pl-5 logoGif"><img src={require('../../img/animation.gif')} /></div>
                        : <div className="ml-5"><h1 className="ml-5">No Milestones</h1></div>}
            </div>
        </div >
    );

}
const mapStateToProps = (state) => {

    return {
        milestones: state.public_reducer.milestones,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllMilestonesTasks: () => dispatch(actions.getAllMilestonesTasks()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Milestones)

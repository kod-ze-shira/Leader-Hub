import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './Milstones.css';
import ViewMilstone from './viewMilstone';

function Milestones(props) {
    const [showGif, setShowGif] = useState(true)
    // let milestones = []
    useEffect(() => {
        //check if has workspaces in redux and "get all workspaces" give priorities
        if (props.workspaces.length === 0)
            props.getallWorkspaces()
        setTimeout(() => {
            setShowGif(false)
        }, 4000);

    }, [])
    // const renderTasks = milestones.length ? milestones.map((milestone) => {
    //     return <ViewMilstone milestone={milestone} />
    // }) : null
    const renderTasks = props.workspaces.map((workspace) => {
        return workspace.projects.map((project) => {
            return project.cards.map((card) => {
                return card.tasks.map((task) => {
                    if (task.milestones) {
                        let milestone = { 'task': task, 'card': card }
                        console.log(milestone);
                        return <ViewMilstone milestone={milestone}/>
                    }
                })
            })
        })
        // console.log('milestones', milestones);
    })

    return (
        <div className="body-workspace ">
            <div className=" row justify-content-start mill mx-4 ">
                <p className="milstoneTitle pl-3">My Milestones</p>
            </div >

            <div className="mt-5">
                {props.workspaces.length ?
                renderTasks
                : showGif ?
                        <div className="logoGif d-flex justify-content-center"><img className="LampAnimation" src={require('../../../assets/img/hub.gif')} /></div>
                        : <div className="ml-5"><h1 className="ml-5">No Milestones</h1></div>}
            </div>
        </div >
    );

}
const mapStateToProps = (state) => {

    return {
        milestones: state.public_reducer.milestones,
        workspaces: state.public_reducer.workspaces

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllMilestonesTasks: () => dispatch(actions.getAllMilestonesTasks()),
        getallWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Milestones)

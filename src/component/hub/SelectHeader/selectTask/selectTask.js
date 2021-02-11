import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import Select from 'react-select';


function SelectTask(props) {


    useEffect(() => {

    }, [])


    let myTask = props.task;

    const changeSelectedTask = (id) => {
        myTask = props.tasks.find(p => p._id == id.value)
        props.setCard(myTask)
    }

    const viewTasksList = props.tasks.map((task) => (
        { value: task._id, label: task.name }
    ))

    return (
        <>
            <div className="react-select">
                <Select
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedTask(e)}
                    name="color"
                    options={viewTasksList}
                    placeholder={"All Tasks"}
                />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        tasks: state.public_reducer.tasks,
        task: state.task_reducer.task,
        card: state.card_reducer.card,
        cards: state.public_reducer.cards,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        setTask: (task) => dispatch(actions.setTask(task)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectTask)





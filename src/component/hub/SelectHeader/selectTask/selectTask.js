import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { actions } from '../../../../redux/actions/action';

function SelectTask(props) {
    useEffect(() => {

    }, [])

    let myTask = props.task;
    const changeSelectedTask = (id) => {
        myTask = props.tasks.find(p => p._id == id.value)
        props.setTask(myTask)
    }
    const viewTasksList = props.card.tasks ? props.card.tasks.map((task) => (
        { value: task._id, label: task.name }
    )) : null
    const style = {
        control: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#eeeeee' : 'white',
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            "&:hover": {
                border: state.isFocused ? 0 : 0,
                backgroundColor: state.isFocused ? '#eeeeee' : 'white',

            }
        })
    };
    return (
        <>
            <div className="react-select">
                <Select
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedTask(e)}
                    name="color"
                    options={viewTasksList}
                    placeholder={"All Tasks"}
                    styles={style}

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
        // getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectTask)





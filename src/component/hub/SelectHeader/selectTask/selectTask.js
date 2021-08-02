import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action';
import Select from 'react-select';
import Background from '../../../../assets/img/down-arrow.svg';

function SelectTask(props) {
    useEffect(() => {

    }, [])

    let myTask;
    const changeSelectedTask = (id) => {
        myTask = props.tasks.find(p => p._id === id.value)
        // props.setTask(myTask)//beacouse delete workspace
    }

    const viewTasksList = props.cards[props.indexCurrentCard] && props.cards[props.indexCurrentCard].tasks ? props.cards[props.indexCurrentCard].tasks.map((task) => (
        { value: task._id, label: task.name }
    )) : null
    const style = {
        control: (base, state) => ({
            ...base,
            backgroundSize: '10px 10px',
            backgroundPosition: '90%',
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: state.isFocused ? 'transparent' : 'transparent',
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            "&:hover": {
                border: state.isFocused ? 0 : 0,
                backgroundColor:'transparent' ,
            }
        })
    };
    return (
        <>
            <div className="react-select">
                <Select
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedTask(e)}
                    // name="color"
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: '#68c7cb1a',
                            primary: '#68C7CB',
                            primary50: '#68C7CB',
                        },
                    })}
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
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        // getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectTask)





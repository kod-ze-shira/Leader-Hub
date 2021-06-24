import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { actions } from '../../../../redux/actions/action';
import Background from '../../../img/down-arrow.svg';


function SelectCards(props) {


    useEffect(() => {
        if (props.cards[0])
            props.setCard(props.cards[0])

    }, [])


    //to chang the card that user selected
    let myCard = props.card;

    const changeSelectedCard = (id) => {
        myCard = props.cards.find(p => p._id === id.value)
        props.setCard(myCard)
        props.flag(myCard._id)
        // if (myCard.tasks[0])
        //     props.setTask(myCard.tasks[0])
        // else
        //     props.setTaskName("No Cards")
    }
    const viewCardsList = props.cards.length ? props.cards.map((card) => (
        { value: card._id, label: card.name }
    )) : null;

    const style = {
        control: (base, state) => ({
            ...base,
            backgroundSize: '10px 10px',
            backgroundPosition: '90%',
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: state.isFocused ? '#eeeeee' : 'white',
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            "&:hover": {
                border: state.isFocused ? 0 : 0,
                backgroundColor: '#eeeeee',
            }
        })
    };
    return (
        <>
            <div className="react-select">

                <Select
                    className="select-card"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedCard(e)}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: '#68c7cb1a',
                            primary: '#68C7CB',
                            primary50: '#68C7CB',
                        },
                    })}
                    options={viewCardsList}
                    // props.card ? props.card.name :
                    placeholder={"All Cards"}
                    styles={style}

                />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        card: state.card_reducer.card,
        workspace: state.workspace_reducer.workspace,
        cards: state.public_reducer.cards,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setTask: (task) => dispatch(actions.setTask(task)),
        setTaskName: (taskName) => dispatch(actions.setTask(taskName)),
        getTasksByCardId: (cardId) => dispatch(actions.getTasksByCardId(cardId))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectCards)





import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { actions } from '../../../../redux/actions/action';
import Background from '../../../../assets/img/down-arrow.svg';


function SelectCards(props) {


    useEffect(() => {
     

    }, [])


    //to chang the card that user selected

    let myCard; let cardIndex
    const changeSelectedCard = (id) => {
        myCard = props.cards.find(p => p._id === id.value)
        cardIndex = props.cards.findIndex(p => p._id === id.value)
        props.setCurrentIndexCard(cardIndex)
        props.flag(myCard._id)//to open card in list page
    }

    const viewCardsList = props.cards.length ? props.cards.map((card) => (
        card !== null ? { value: card._id, label: card.name } : null
    )) : null;

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
                backgroundColor: 'transparent',
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
        cards: state.public_reducer.cards,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),
        getTasksByCardId: (cardId) => dispatch(actions.getTasksByCardId(cardId))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectCards)





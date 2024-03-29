import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import ContactList from '../contact/contactList';
import ToastDelete from '../toastDelete/toastDelete1';
import './projectPlatform.css';

function ProjectPlatform(props) {
    const [showInput, setShowInput] = useState(false)
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [taskOrCard, setTaskOrCard] = useState()

    useEffect(() => {

    }, [props.focusInputCard]);

    if (!showInput) {
        if (props.focusInputCard) {
            setShowInput(true)
        }
    }


    const [inputValue, setInputValue] = useState()
    const textInput = useRef(null);


    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    function showInputToAddCard() {
        setShowInput(!showInput)
        // $('.add-card-btn').click(function () {
        //     $('.add-card').focus()
        // })

    }


    const newCard = () => {
        let card;
        if (inputValue) {
            card = { "project": props.cards[0].project, name: inputValue }
            props.newCard(card)
        }
        setInputValue("")
        setShowInput(false)
    }
    // ?מחיקת משימה לא עובדת
    //show toast delete to true and save the sask that shold be deleted
    const showToastToDeleteTask = (taskOrCard) => {
        setTaskOrCard(taskOrCard)
        props.showToast(taskOrCard)
    }

    const deleteTaskOrCard = () => {
        setShowToastDelete(false)
        if (props.cards.find(card => card._id === taskOrCard._id)) {
            props.removeCardById(taskOrCard._id)
        }
        else
            props.removeTaskById(taskOrCard._id)
    }
    return (
        <>
            <div className=" bodyListTak container-fluid">
                <div className="cards">
                    <CardsByProject
                        closeCalendarOrContact={props.closeCalendarOrContact}
                        showRocketShip={props.showRocketShip}
                        viewToastMassege={props.viewToastMassege}
                        showToast={(obj) => showToastToDeleteTask(obj)} flag={props.flag}
                        viewContactList={props.viewContactList} />
                    <div className="add-new-pop-up ">
                        <a >New Workspace</a><br></br>
                        <a>New Project</a><br></br>
                        <a>New Card</a><br></br>
                        <a>New Task</a><br></br>
                    </div>
                    {showInput ?
                        <input
                            autoFocus="true"
                            id="input-card"
                            ref={textInput}
                            placeholder={"New Card"}
                            value={inputValue}
                            onChange={updateInputValue}
                            className="form-control mt-2 col-6 ml-4"
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    newCard()
                                }
                            }}></input>
                        : null}
                    <a className="ml-4 mx-5 add-card-btn" data-tip data-for="add_c"
                        onClick={showInputToAddCard}>Add Card+</a>
                    {/* <ReactTooltip data-tip id="add_c" place="top" effect="solid">
                        {title.title_add_card}
                    </ReactTooltip> */}

                </div>
                {showToastDelete ?
                    <ToastDelete
                        toOnClose={deleteTaskOrCard}
                        toSetShowToastDelete={() => { setShowToastDelete(false) }}
                        name={taskOrCard.name} /> : null}
                {showToastDelete ?
                    <ContactList toSetShowToastDelete={() => { setShowToastDelete(false) }}
                        viewToastMassege={props.viewToastMassege} /> : null}
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newCard: (cardname) => dispatch(actions.newCard(cardname)),
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)
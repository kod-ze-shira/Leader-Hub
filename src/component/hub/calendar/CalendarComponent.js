import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
// import ViewContact from './viewContact';
import { actions } from '../../../redux/actions/action'
import Calendar from 'react-calendar';



function CalendarComponent(props) {
    useEffect(() => {
        if (props.contactsUser.length == 0)
            props.getContactsForUser()
    }, [])
    const handleChange = (event) => {
        let a = new Date(event)
        a.setDate(a.getDate() + 1);
        let dueDate = JSON.stringify(a)
        let d = JSON.parse(dueDate)
        let updatedDueDate = d.split("-")[2][0]
            + d.split("-")[2][1] + '/' + d.split("-")[1] + '/' + d.split("-")[0];

        let editTaskInRedux = { "nameFiled": "dueDate", "value": updatedDueDate }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        props.EditTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask])
        props.closeCalendar()
    }

    const [value, onChange] = useState(new Date());

    const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
    const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList - 200;
    const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
    const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList

    return (
        <>

            <div onClick={(e) => e.stopPropagation()}
                className='div_contacts' style={{ "left": props.hub ? left : 60, "top": props.hub ? top : 410 }}>
                <div className='container div_contacts_list mt-2' style={{ "width": props.hub ? width : 300, "height": props.hub ? height : 200 }}>
                    <Calendar
                        onChange={(e) => handleChange(e)}
                        value={value}
                    />
                </div>

            </div>
        </>
    )
}
export default connect(
    (state) => {
        return {
            indexCurrentTask: state.public_reducer.indexCurrentTask,
            indexCurrentCard: state.public_reducer.indexCurrentCard,
            cards: state.public_reducer.cards,
            contactsUser: state.share_reducer.contactsUser,
            leftContactList: state.design_reducer.leftContactList,
            topContactList: state.design_reducer.topContactList,
            heightCurrentScreen: state.design_reducer.heightCurrentScreen,
            widthCurrentScreen: state.design_reducer.widthCurrentScreen,
            widthContactsList: state.design_reducer.widthContactsList,
            heightContactsList: state.design_reducer.widthContactsList,

        }
    },
    (dispatch) => {
        return {
            EditTask: (task) => dispatch(actions.editTask(task)),
            getContactsForUser: () => dispatch(actions.getContactsForUser()),
            setTaskByFiledFromTasks: (task) => dispatch(actions.setTaskByFiledFromTasks(task))
        }
    }
)(CalendarComponent)
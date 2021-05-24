// import React from 'react';
import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux';
import ViewContact from './viewContact';
import { actions } from '../../../redux/actions/action'



function ContactList(props) {
  useEffect(() => {
    debugger
    if (props.contactsUser.length == 0)
      props.getContactsForUser()
  }, [])
  const handleChange = (event) => {
    event.stopPropagation();
  }

  const saveContact = (value) => {
    // let editStatusInRedux
    // editStatusInRedux = { "nameFiled": "status", "value": value }
    // if (props.task.complete)
    //     editStatusInRedux = { "nameFiled": "complete", "value": false }
    // props.setTaskByFiledFromTasks(editStatusInRedux)
  }

  const viewContacts = props.contactsUser ? props.contactsUser.map((contact) => (
    <ViewContact saveContact={(e) => saveContact(e)} contact={contact}></ViewContact>
  )) : null

  const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
  const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList - 200;
  const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
  const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList

  return (
    <>

      <div className='div_contacts' style={{ "left": props.hub ? left : 60, "top": props.hub ? top : 410 }}>
        <div className='container div_contacts_list mt-2' style={{ "width": props.hub ? width : 300, "height": props.hub ? height : 200 }}>
          {viewContacts}
        </div>
        <div className='mx-2 form'>
          <input placeholder="Name or email " className=" form-control invite-contact" onChange={(e) => handleChange(e)}></input>
          {/* <button className="invite-btn"> + invite</button> */}

        </div>
      </div>
    </>
  )
}
export default connect(
  (state) => {
    return {
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
      getContactsForUser: () => dispatch(actions.getContactsForUser()),
    }
  }
)(ContactList)
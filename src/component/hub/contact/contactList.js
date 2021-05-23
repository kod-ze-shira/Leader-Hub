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
  const viewContacts = props.contactsUser ? props.contactsUser.map((contact) => (
    <ViewContact contact={contact}></ViewContact>
  )) : null
  const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList;
  const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList;
  const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
  const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList
  return (
    <>

      <div className='div_contacts' style={{ "left": left, "top": top }}>
        <div className='container div_contacts_list mt-2' style={{ "width": width, "height": height }}>
          {viewContacts}
        </div>
        <div className='mx-2 form'>
          <input placeholder="Name or email " className=" form-control invite-contact"></input>
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
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
  return (
    <>
      <div className=' div_contacts'>
        <div className='container div_contacts_list mt-2'>
          {viewContacts}
        </div>
        <div className='mx-2 form'>
          <input placeholder="Name or email " className="mt-2 mb-2 form-control invite-contact"></input>
          {/* <button className="invite-btn"> + invite</button> */}

        </div>
      </div>
    </>
  )
}
export default connect(
  (state) => {
    return {
      contactsUser: state.share_reducer.contactsUser
    }
  },
  (dispatch) => {
    return {
      getContactsForUser: () => dispatch(actions.getContactsForUser()),
    }
  }
)(ContactList)
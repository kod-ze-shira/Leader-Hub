// import React from 'react';
import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux';
import ViewContact from './viewContact';
import { actions } from '../../../redux/actions/action'


function ContactList(props) {
  let viewContacts = ''

  useEffect(() => {
    debugger
    console.log(viewContacts)
    if (props.contactsUser.length == 0)
      props.getContactsForUser()
  }, [])
  const [emailOfContact, setEmailOfContact] = useState('')
  const [showInviteButton, setShowInviteButton] = useState(false)

  const [index1, setIndex] = useState(0)
  const handleChange = (event) => {
    debugger
    setEmailOfContact(event.target.value)

  }

  const saveContact = (value) => {
    // let editStatusInRedux
    // editStatusInRedux = { "nameFiled": "status", "value": value }
    // if (props.task.complete)
    //     editStatusInRedux = { "nameFiled": "complete", "value": false }
    // props.setTaskByFiledFromTasks(editStatusInRedux)
  }

  function searchContact() {
    setEmailOfContact(document.getElementsByClassName('invite-contact').value)
  }

  const inviteContact = (e) => {
    debugger
    props.assingTo(emailOfContact)

  }

  const show = () => {
    // debugger
    // setShowInviteButton(true)
  }

  viewContacts = props.contactsUser ? props.contactsUser.map((contact, index) => (
    contact.email ? (contact.email.toUpperCase().includes(emailOfContact.toUpperCase()) ?
      <ViewContact index={index} saveContact={(e) => saveContact(e)} contact={contact}></ViewContact> : null
    ) : null
  )) : null

  const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
  const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? 200 : props.heightContactsList - 200;
  const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
  const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList

  return (
    <>

      <div className='div_contacts' style={{ "left": props.hub ? left : 60, "top": props.hub ? top : 410, maxHeight: 250 }}>
        <div className='container div_contacts_list mt-2' style={{ "width": props.hub ? width : 300, }}>
          <div className='row mb-2'>
            <input
              onClick={(e) => e.stopPropagation()}
              type='text'
              className="ml-2 form-control invite-contact col-8"
              onChange={(e) => handleChange(e)}
              // value={emailOfContact}
              placeholder="Name or email "
            />
            {
              index1 > 10 ? <button>ssss</button> : null
            }
            <button className={showInviteButton ? "invite-btn ml-2 col-3 " : "btn-none"} onClick={(e) => inviteContact(e)}> invite</button>
          </div>
          {viewContacts}
        </div>
        <div className='mx-2 form'>
          {/* <input
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChange(e)}
            value={emailOfContact}

          ></input> */}


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
      assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact)),


    }
  }
)(ContactList)
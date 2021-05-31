import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux';
import ViewContact from './viewContact';
import { actions } from '../../../redux/actions/action'
import { Alert } from 'bootstrap';



function ContactList(props) {
  const [arrayFilter, setArrayFilter] = useState(null);
  useEffect(() => {
    if (props.contactsUser.length == 0)
      props.getContactsForUser()
  }, [])

  const [valueSearch, setValueSearch] = useState("")

  const setFIlter = () => {
    let arrayTemp = [];
    props.contactsUser.map((contact) => {
      if (contact.email.toUpperCase().includes(valueSearch.toUpperCase())) {
        arrayTemp.push(contact);
      }

    })
    console.log(arrayTemp)
    setArrayFilter(arrayTemp)
  }

  const handleChange = (event) => {
    setValueSearch(event.target.value)
    setFIlter();

  }

  useEffect(() => {
    setFIlter();
  }, [props.contactsUser])

  const assingTaskToContact = () => {
    props.assingTo(valueSearch)

  }
  
 const contactList =props.contactsUser.length ?
  arrayFilter && arrayFilter.length ?
    arrayFilter.map((contact) =>
      <ViewContact contact={contact}></ViewContact>

    )
    :
    <button className=" col-4 my-2 invite-button"
      onClick={(e) => assingTaskToContact(e)}
    >Send Invite</button>
  : <></>
// <><div class="spinner-border" role="status">
//   <span class="sr-only">Loading...</span>
// </div></>

  const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
  const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList - 200;
  const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
  const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList

  return (
    <>

      <div className='div_contacts ' style={{ "left": props.hub ? left : 60, "top": props.hub ? top : 410, "width": props.hub ? width : 300, "maxHeight": 250 }}>
        <div className='container div_contacts_list  ' style={{}}>
          <div className=' row  mx-1'>
            <input placeholder="Name or email "
              className={arrayFilter && arrayFilter.length && props.hub ? " form-control invite-contact col-12 my-2" : "form-control invite-contact col-8 my-2"}
              onChange={(e) => handleChange(e)}
              onClick={(e) => e.stopPropagation()}
              value={props.contactsUser.email}></input>
            {contactList}
            
          </div>
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
      assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact))

    }
  }
)(ContactList)

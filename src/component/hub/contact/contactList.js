import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import ViewContact from './viewContact';
import $ from 'jquery'



function ContactList(props) {
  const [contacts, setContacts] = useState(props.contactsUser);
  const [search, setSearch] = useState('')

  useEffect(() => {
    $(".invalid-feedback").css("display", "none");

  }, [])


  const [valueSearch, setValueSearch] = useState("")
  const nameRequired = useRef()
  function searchContacts(e) {
    setSearch(e.target.value)
    let help = []
    props.contactsUser.map(cm => {
      let name = cm.name.search(e.target.value)
      let email = cm.email.search(e.target.value)
      if (name === 0 || email === 0)
        help.push(cm)
    })
    setContacts(help)
  }

  // const setFIlter = () => {
  //   let arrayTemp = [];
  //   if (props.contactsUser.length)
  //     props.contactsUser.map((contact) => {
  //       if (contact.email.toUpperCase().includes(valueSearch.toUpperCase())) {
  //         arrayTemp.push(contact);
  //       }
  //     })
  //   setArrayFilter(arrayTemp)
  // }


  const handleChange = (event) => {
    setValueSearch(event.target.value)
    searchContacts(event);
    if (valueSearch)
      $(".invalid-feedback").css("display", "none");
  }

  // useEffect(() => {
  //   setFIlter();
  // }, [])
  //   const assingTaskToContact = (email) => {
  //     let member
  //     let assign = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo
  //     let isExistContactInList = false
  //     let i
  //     for (i = 0; i < assign.length; i++) {

  //         if (assign[i].contact._id=== props.contact._id)
  //             isExistContactInList = true

  //     }
  //     if (!isExistContactInList) {
  //         if (admin && props.contact._id=== contactId)
  //             member = { "email": email, "level": "admin" }
  //         else
  //             member = { "email": email }
  //         props.assingToMany(member)

  //     }
  // }

  const assingTaskToContact = (e) => {
    let member
    e.stopPropagation()
    let isValid = ValidateEmail(valueSearch)
    console.log(isValid)
    if (isValid && nameRequired.current.value) {
      $(".invalid-feedback").css("display", "none");
      $(".invite-button").css("backgroundColor", "#68C7CB");
      $(".invite-button").css("color", "#358A8D");

      member = { "email": valueSearch }
      props.assingToMany(member)

      setTimeout(() => {
        $(".div_contacts").css("display", "none");
      }, 1500);
    }
    else {
      nameRequired.current.focus()
      $(".invalid-feedback").css("display", "block");
    }
  }

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(valueSearch)) {
      return (true)
    }
    else {
      return (false)
    }
  }

  // const contactList = props.contactsUser.length > 0 ?
  //   contacts && contacts.length ?
  //     contacts.map((contact) =>
  //       <ViewContact contact={contact} viewToastMassege={props.viewToastMassege} closeContactList={(e)=>props.taskDetails?props.closeContactList():null}/>
  //     )
  //     :
  //     <button className="ml-2 col-4 my-2 invite-button  " autocomplete="chrome-off"
  //       onClick={(e) => assingTaskToContact(e)}
  //     >Send Invite</button> :
  //   <><div className="spinner-border my-2 mx-3" role="status">
  //     <span className="sr-only">Loading...</span>
  //   </div>
  //   </>

  const contactList =
    contacts && contacts.length ?
      contacts.map((contact) =>
        <ViewContact contact={contact} viewToastMassege={props.viewToastMassege} closeContactList={(e) => props.taskDetails ? props.closeContactList() : null} />
      )
      :
      <button className="ml-2 col-4 my-2 invite-button  " autocomplete="chrome-off"
        onClick={(e) => assingTaskToContact(e)}
      >Send Invite</button>

  const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
  const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList - 200
  const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
  const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList
  const bottom = props.heightCurrentScreen - props.topContactList
  return (
    <>

      <div className='div_contacts ' style={{ "left": props.hub ? left : "", "top": props.hub ? top : "", "width": props.hub ? width : 300, "maxHeight": 250, "bottom": props.taskDetails ? bottom : "" }}>
        <div className='container div_contacts_list  ' style={{}}>
          <div className=' row  mx-1 form-group' id='nameRequired'>
            {props.hub ?
              <input placeholder="Name or email " required ref={nameRequired}
                className={contacts && contacts.length ? " form-control invite-contact col-12 my-2 " : "form-control invite-contact col-7 my-2 "}
                onChange={(e) => { handleChange(e); }}
                onClick={(e) => e.stopPropagation()}
                value={props.contactsUser.email}></input>
              : null}
            {contactList}</div>
          {props.taskDetails ? <input placeholder="Name or email " required ref={nameRequired}
            className={contacts && contacts.length ? " form-control invite-contact col-12 my-2 " : "form-control invite-contact col-7 my-2 "}
            onChange={(e) => { handleChange(e); }}
            onClick={(e) => e.stopPropagation()}
            value={props.contactsUser.email}></input>
            : null}

          <div className="invalid-feedback">
            Please enter valid email.
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
      assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact)),
      assingToMany: (emailOfContact) => dispatch(actions.assingToMany(emailOfContact))

    }
  }
)(ContactList)


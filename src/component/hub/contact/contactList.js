import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux';
import ViewContact from './viewContact';
import { actions } from '../../../redux/actions/action'
import { Alert } from 'bootstrap';
import $ from 'jquery'



function ContactList(props) {
  const [arrayFilter, setArrayFilter] = useState(null);
  useEffect(() => {
    if (props.contactsUser.length == 0)
      props.getContactsForUser()
  }, [])

  const [valueSearch, setValueSearch] = useState("")
  const nameRequired = useRef()

  const setFIlter = () => {
    let arrayTemp = [];
    if (props.contactsUser)
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
  }, [])

  const assingTaskToContact = (e) => {
    
    e.stopPropagation()
    let isValid = ValidateEmail(valueSearch)
    console.log(isValid)
    if (isValid) {
      $(".invite-button").css("backgroundColor", "#1FB9C1");
      props.assingTo(valueSearch)
    }
    else {
      nameRequired.current.focus()
      $(".invalid-feedback").css("display", "block");

    }
    // else {
    //   nameRequired.current.focus()
    //   var form = document.getElementById('nameRequired')
    //   form.classList.add('was-validated')
    // }
  }




  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(valueSearch)) {
      return (true)
    }
    else {


      // $(".invalid-feedback").css("display", "block");

      // var form = document.getElementById('nameRequired')
      // form.classList.add('was-validated')
      return (false)

    }
  }

  const contactList = props.contactsUser.length > 0 ?
    arrayFilter && arrayFilter.length ?
      arrayFilter.map((contact) =>
        <ViewContact contact={contact}></ViewContact>

      )
      :
      <button className="col-4 my-2 invite-button  "
        onClick={(e) => assingTaskToContact(e)}
      >Send Invite</button> :
    <><div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div></>

  const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
  const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList - 200;
  const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
  const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList

  return (
    <>

      <div className='div_contacts ' style={{ "left": props.hub ? left : 60, "top": props.hub ? top : 410, "width": props.hub ? width : 300, "maxHeight": 250 }}>
        <div className='container div_contacts_list  ' style={{}}>
          <div className=' row  mx-1 form-group' id='nameRequired'>
            <input placeholder="Name or email " required ref={nameRequired}
              className={arrayFilter && arrayFilter.length && props.hub ? " form-control invite-contact col-12 my-2 " : "form-control invite-contact col-8 my-2 "}
              onChange={(e) => handleChange(e)}
              onClick={(e) => e.stopPropagation()}
              value={props.contactsUser.email}></input>


            {contactList}

          </div>
          <div class="invalid-feedback">
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
      assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact))

    }
  }
)(ContactList)

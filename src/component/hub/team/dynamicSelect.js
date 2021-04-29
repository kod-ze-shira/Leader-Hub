import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { actions } from '../../../redux/actions/action';
import share from '../../img/share.svg'

function DynamicSelect(props) {
  useEffect(() => {
    if (props.options == 'contacts')
      props.getContactsForUser()
    else
      props.getAllTeamsForUser()
  }, [])

  const viewContactsList = props.contactsUser ? props.contactsUser.map((contact) => (
    { value: contact, label: contact.email }
  )) : null

  const viewTeamsList = props.teamsUser ? props.teamsUser.map((team) => (
    { value: team._id, label: <div><img  referrerpolicy="no-referrer" src={team.logo} height="30px" width="30px"/>{team.name} </div> }
  )) : null
 
  const handleChange = (newValue, actionMeta) => {
    if (newValue) {
      console.group('Value Changed');
      console.log(newValue);
      props.options == 'contacts'? props.setContactEmail(newValue):props.addMemberEmailToMembersEmailList(newValue)
      console.log(`action: ${actionMeta.action}`);
      console.groupEnd();
    }
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    // if(actionMeta.action==="set-value")
    // alert(inputValue)
    // props.addMember(actionMeta)
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <div>
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={props.options == 'contacts' ? viewContactsList : viewTeamsList}
    />
    </div>
  );

}


export default connect(
  (state) => {
    return {
      contactsUser: state.share_reducer.contactsUser,
      teamsUser: state.share_reducer.teamsUser
    }
  },
  (dispatch) => {
    return {
      getContactsForUser: () => dispatch(actions.getContactsForUser()),
      getAllTeamsForUser: () => dispatch(actions.getAllTeamsForUser())
    }
  }
)(DynamicSelect)

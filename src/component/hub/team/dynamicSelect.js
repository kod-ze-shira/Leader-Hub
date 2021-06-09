import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { actions } from '../../../redux/actions/action';
import './style.css';

function DynamicSelect(props) {
  useEffect(() => {
    if (props.options === 'contacts' && props.contactsUser.length === 0) {
      props.getContactsForUser()
    }
    else
      if (props.teamsUser.length === 0)
        props.getAllTeamsForUser()
  }, [])
  const [currentIndexTask, setCurrentIndexTask] = useState("")
  const [currentIndexCard, setCurrentIndexCard] = useState("")
  const [showAssignTo, setShowAssignTo] = useState(false)


  useEffect(() => {
    setCurrentIndexTask(props.indexTask)
    setCurrentIndexCard(props.indexCard)
  }, [
    props.cards])

  const colors = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
    "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
    "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
    "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
    "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
    "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"
  ]

  const viewContactsList = props.contactsUser ? props.contactsUser.map((contact) => (
    {
      value: contact, label:
        <div className="container">
          <div className="option-contact row">
            {contact.thumbnail ? <img referrerpolicy="no-referrer" src={contact.thumbnail} className="thumbnail-contact " />
              : <div className="logo-contact" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>{contact.name ? contact.name[0] : null}</div>}

            <p className="name-contact ">{contact.name} </p></div>
        </div>

    }
  )) : null
  const new_options = viewContactsList

  new_options.push({
    value: "element.name",
    label: <label onClick={(e) => setShowAssignTo(true)}>Add contact </label>
  })
  const viewTeamsList = props.teamsUser ? props.teamsUser.map((team) => (
    { value: team, label: <div><img referrerpolicy="no-referrer" src={team.logo} height="30px" width="30px" />{team.name} </div> }
  )) : null
  // const new_options = viewTeamsList

  // new_options.push({
  //   value: "element.name",
  //   label:<div><input onChange={()=>alert()}></input><button onClick={props.setClickTeam}>+</button> <label>Create team</label></div>
  // })
  const [value, setValue] = useState()
  const handleChange = (newValue, actionMeta) => {

    if (newValue) {
      console.group('Value Changed');
      console.log(newValue);
      // setValue(newValue)
      props.options === 'contacts' ? props.setContactEmail(newValue) : props.addMemberEmailToMembersEmailList(newValue)
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
        // placeholder={props.value ?
        //   <div className="container">
        //     <div className="option-contact row">
        //       {props.value.thumbnail ? <img referrerpolicy="no-referrer" src={props.value.thumbnail} className="thumbnail-contact " />
        //         : <div className="logo-contact" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>{props.value.name ? props.value.name[0] : null}</div>}
        //       <img referrerpolicy="no-referrer" src={require('../../img/assingTo-small-icon.png')} className="ml-2 assinto-contact " />
        //       {/* <p className="name-contact ">{props.value.name} </p> */}
        //     </div>
        //   </div>
        //   : <img referrerpolicy="no-referrer" src={require('../../img/assingTo-small-icon.png')} className="assinto-contact" />}
        isClearable
        onChange={handleChange}
        onInputChange={handleInputChange}
        autosize={true}
        options={props.options === 'contacts' ? viewContactsList : viewTeamsList}
      />
      {/* { showAssignTo ? <AssingToContact /> : null} */}

    </div>
  );

}



export default connect(
  (state) => {
    return {
      contactsUser: state.share_reducer.contactsUser,
      teamsUser: state.share_reducer.teamsUser,
      cards: state.public_reducer.cards,
      // indexCurrentCard: state.public_reducer.indexCurrentCard,
      // indexCurrentTask: state.public_reducer.indexCurrentTask
    }
  },
  (dispatch) => {
    return {
      getContactsForUser: () => dispatch(actions.getContactsForUser()),
      getAllTeamsForUser: () => dispatch(actions.getAllTeamsForUser())
    }
  }
)(DynamicSelect)

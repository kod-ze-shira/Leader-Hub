import React from 'react';
import { connect } from 'react-redux';
import ViewTeam from '../teamView/teamView';
import './teamsList.css';

function TeamsList(props){

    const viewTeams = props.teamsUser ? props.teamsUser.map((team) => (
       <ViewTeam addTeamToShare={props.addTeamToShare} team={team}></ViewTeam>
      )): null
    
      return (
     <>

     <div className='row txt_your_team_list pb-3 pt-3 pl-4'>Your Team List </div>
     <div className='container div_teams_list'>
     {viewTeams}
     <div className='row pt-2 pb-2 div_create_team' onClick={()=>props.clickCreateTeam()}>
         <div className='col-1 div_icon_team'>+</div>
         <div className='col-9 div_txt_create_team my-auto'>Create team</div>
     </div>
     </div>
     </>
    
  )  
}
export default connect(
    (state) => {
      return {
        teamsUser: state.share_reducer.teamsUser
      }
    },
    (dispatch) => {
      return {
        // getContactsForUser: () => dispatch(actions.getContactsForUser()),
        // getAllTeamsForUser: () => dispatch(actions.getAllTeamsForUser())
      }
    }
  )(TeamsList)
  
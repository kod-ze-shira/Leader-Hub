import React from 'react';
import { connect } from 'react-redux';
import ViewTeam from '../teamView/teamView';
import './teamList.css'

function TeamList(props){
    const viewTeams = props.teamsUser ? props.teamsUser.map((team) => (
       <ViewTeam team={team}></ViewTeam>
      )): null
  return (
     <>
     <div className='container div_teams'>
     <div className='row txt_your_team_list'>your team list </div>
     <div className='container div_teams_list'>
     {viewTeams}
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
  )(TeamList)
  
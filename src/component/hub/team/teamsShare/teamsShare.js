import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateTeam from '../createTeam/createTeam';
import TeamsList from '../teamsList/teamsList';
import ViewTeam from '../teamView/teamView';
import './teamsShare.css'

function TeamsShare(props) {

  const [showCreateTeam, setShowCreateTeam] = useState(false)

  return (
    <>
      <div className='container div_teams'>
        {
          !showCreateTeam ?
            <TeamsList clickCreateTeam={() => setShowCreateTeam(true)}></TeamsList>
             :
             <CreateTeam></CreateTeam>
        }
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
)(TeamsShare)

import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateTeam from '../createTeam/createTeam';
import TeamsList from '../teamsList/teamsList';
import ViewTeam from '../teamView/teamView';
import './teamsShare.css'

function TeamsShare(props) {

  const [showCraeteTeam, setShowCraeteTeam] = useState(false)

  return (
    <>
      <div className='container div_teams'>
        {/* {
          !showCraeteTeam ?
            <TeamsList clickCreateTeam={() => setShowCraeteTeam(true)}></TeamsList> */}
            {/* : */}
             <CreateTeam></CreateTeam>
        {/* } */}
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

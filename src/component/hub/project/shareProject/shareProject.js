import { event } from 'jquery'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import CreateTeam from '../../team/createTeam/createTeam'
import DynamicSelect from '../../team/dynamicSelect'
import TeamsShare from '../../team/teamsShare/teamsShare'
import ShareOneMember from '../share/shareOneMember/shareOneMember'
import './shareProject.css'
import $ from 'jquery'
import arrow_select from '../../../../component/img/arrow_select.svg'
function ShareProject(props) {
    const [shareDetails, setShareDetails] = useState([])//all contacts details
    const [membersTeamEmails, setMembersTeamEmails] = useState([])//team members
    const [teams, setTeams] = useState([])
    const [teamId, setTeamId] = useState(0)
    const [permissionContact, setPermissionContact] = useState('viewer')
    const [permissionTeam, setPermissionTeam] = useState('viewer')
    const [clickCreateTeam, setClickCreateTeam] = useState(false)
    const [showTeams, setShowTeams] = useState(false)
    //onselect contact his email and perrmisin add shareDetails list
    const setStateMailToContactMail = (emailMember) => {
        let shareDetailToAdd
        if (typeof (emailMember.value) === 'object')//its contact 
            shareDetailToAdd = { 'member': emailMember.value, 'permission': permissionContact }
        else// he not my contact
            shareDetailToAdd = { 'member': { 'email': emailMember.value }, 'permission': permissionContact }
        setShareDetails([...shareDetails, shareDetailToAdd])
    }
    //onselect perrmision to contact his  permission will save in state
    const setStatePerrmissionContact = (event) => {
        setPermissionContact(event.target.options[event.target.selectedIndex].label)
    }

    //on select team name
    const addTeamMembersEmailsToMembersEmailList = (team) => {
        //add members
        let membersTeam = team.members
        membersTeam.forEach(element => {
            // membersTeamEmails.push({'shareDetail':element.contactMember})
            membersTeamEmails.push(element.contactMember)
            // setMembersTeamEmails([...membersTeamEmails, element.contactMember])
        });
        let shareDetailsTemp = []
        let shareDetailToAdd
        membersTeamEmails.forEach(element => {
            //to add perrmision all members team
            shareDetailToAdd = { 'member': element, 'permission': permissionTeam }
            shareDetailsTemp.push(shareDetailToAdd)

        })
        //if render team not in shareDetails
        let teamToShare = { 'teamId': team._id, 'members': shareDetailsTemp }
        setTeams([...teams, teamToShare])
        setMembersTeamEmails([])
        setShowTeams(false)//close teams list
    }
    //on select perrmission to team
    const setStatePermissionTean = (event) => {
        setPermissionTeam(event.target.options[event.target.selectedIndex].label)
    }
    //onchange perrmision of contact
    const changePermissionContactAfterRender = (event, shareDetailWithNewPermission) => {
        let permission = event.target.options[event.target.selectedIndex].label
        shareDetails.find(detail => {
            if (detail.member.email == shareDetailWithNewPermission.member.email)
                detail.permission = permission
        })
    }
    //onchange perrmision of team member
    const changePermissionMemberAfterRender = (event, shareDetailWithNewPermission, teamId) => {
        let permission = event.target.options[event.target.selectedIndex].label
        teams.forEach(team => {
            if (team.teamId == teamId)
                team.members.find(member => {
                    if (member.member.email == shareDetailWithNewPermission.member.email)
                        member.permission = permission
                })
        });
    }
    const renderShareDetails = () => {
        return shareDetails.map(detail => {
            return <ShareOneMember
                member={detail}
                changePermission={changePermissionContactAfterRender} />

        })
    }
    // if render team withot shareDetails
    const renderShareDetailsOfTeam = () => {
        return teams.map(team => {
            return team.members.map(member => {
                return <ShareOneMember
                    teamId={team.teamId}//בשביל שנוי הרשאה לחבר שיידע לשנות לו רמת הרשאה כלפי הטים הזה, מקרה קצה
                    member={member}
                    changePermission={changePermissionMemberAfterRender} />
            })

        })
    }
    const shareObject = () => {
        let details = { shareDetails: shareDetails, teams: teams }
        props.shareObject(details)
    }

    return (
        <>
            <div onClick={() => setShowTeams(false)} className="details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-1 mb-2">Share Project</h5>
                <div class="row justify-content-between  mx-1 mb-2">
                    <p className="txt_description_share">your teammates will get an email that gives them access to your team.</p>
                </div>
                <div className="row pl-3 pt-3 pb-1">
                    <div className="txt_share">Share With Email Address</div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <DynamicSelect
                            setContactEmail={setStateMailToContactMail}
                            options={'contacts'} />
                    </div>
                    <div className="col-3 pl-0">
                        <select class="form-control select_permission" onChange={(e) => setStatePerrmissionContact(e)}>
                            {/* <option disabled selected>Select...</option> */}
                            <option value="1">viewer</option>
                            <option value="2">editor</option>
                            <option value="3">admin</option>
                        </select>
                    </div>
                </div>
                <div className="row pl-3 pt-3 pb-1">
                    <div className="txt_share">Share With Teams</div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <div className='row'>
                            <div className='col-10'>
                                <div className='div_choose_team'>
                                    Choose Team
                        </div>
                            </div>
                            <div className='col-1 my-auto' onClick={(e) => { setShowTeams(true); e.stopPropagation() }}>
                                <img src={arrow_select}></img>
                            </div>
                        </div>


                        {/* <DynamicSelect
                            options={'teams'}
                            addMemberEmailToMembersEmailList={addTeamMemberEmailToMembersEmailList} /> */}
                    </div>
                    <div className="col-md-3 pl-0">
                        <select class="select_permission form-control" onChange={(e) => setStatePermissionTean(e)}>
                            {/* <option disabled selected>Select...</option> */}
                            <option value="1">viewer</option>
                            <option value="2">editor</option>
                            <option value="3">admin</option>
                        </select>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col txt_share_with">
                        Share with:
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="div_share_with">
                            {renderShareDetails()}
                            {renderShareDetailsOfTeam()}
                        </div>
                    </div>
                </div>
                {showTeams ? <TeamsShare addTeamToShare={addTeamMembersEmailsToMembersEmailList} /> : null}
                {/* {clickCreateTeam ?
                    <CreateTeam /> : null} */}
                <div className="row pt-4 row_btn_share pr-4">
                    <button className="btn_share" onClick={shareObject}>Share</button>
                </div>
            </div>

        </>
    )

}
export default connect(
    (state) => {
        return {

        }
    },
    (dispatch) => {
        return {
            shareObject: (shareDetails) => dispatch(actions.shareObject(shareDetails))
        }
    }
)(ShareProject)
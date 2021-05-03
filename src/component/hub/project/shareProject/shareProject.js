import { event } from 'jquery'
import React, { useState } from 'react'
import DynamicSelect from '../../team/dynamicSelect'
import ShareOneMember from '../share/shareOneMember/shareOneMember'
import './shareProject.css'

export default function ShareProject() {
    const [disabledSelectPermission, setDisabledSelectPermission] = useState('false')
    const [shareDetails, setShareDetails] = useState([])//all contacts details
    const [shareDetail, setShareDetail] = useState('')//contact email
    const [membersTeamEmails, setMembersTeamEmails] = useState([])//team members
    const [teams, setTeams] = useState([])
    const [teamId, setTeamId] = useState(0)
    //onselect contact his email be in  state:email
    const setStateMailToContactMail = (emailMember) => {
        setDisabledSelectPermission('true')
        console.log(disabledSelectPermission);
        setShareDetail(emailMember.value)
    }
    //onselect perrmision to contact his email and permission will add to members list
    const addContactToList = (event) => {
        let shareDetailToAdd = { 'shareDetail': shareDetail, 'permission': event.target.options[event.target.selectedIndex].label }
        setShareDetails([...shareDetails, shareDetailToAdd])
        event.target.selectedIndex = 0
    }
    //on select team name
    const addTeamMemberEmailToMembersEmailList = (team) => {
        setTeamId(team.value._id)
        let membersTeam = team.value.members
        membersTeam.forEach(element => {
            // membersTeamEmails.push({'shareDetail':element.contactMember})
            membersTeamEmails.push(element.contactMember)
            // setMembersTeamEmails([...membersTeamEmails, element.contactMember])
        });

    }
    //on select perrmission to team
    const addMemberTeamToList = (event) => {
        let shareDetailsTemp = []
        membersTeamEmails.forEach(element => {
            let shareDetailToAdd = { 'shareDetail': element, 'permission': event.target.options[event.target.selectedIndex].label }
            shareDetailsTemp.push(shareDetailToAdd)
            setShareDetails([...shareDetailsTemp])
        })
        //if render team not in shareDetails
        // let teamToShare = { 'teamId': teamId, 'members': membersTeamEmails }
        // setTeams([...teams, teamToShare])
        setMembersTeamEmails([])

        event.target.selectedIndex = 0
    }
    const renderShareDetails = () => {
        return shareDetails.map(detail => {
            console.log(detail);
            return <ShareOneMember member={detail} />

        })
    }
    //if render team withot shareDetails
    // const renderShareDetailsOfTeam = () => {
    //   return   teams.map(team => {
    //         team.members.map(member=>{
    //         return <ShareOneMember member={member} />
    //         })

    //     })
    // }
    
    return (
        <>
            <div className="details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-1 mb-2">Share Project</h5>
                <div class="row justify-content-between  mx-1 mb-2">
                    <p className="txt_description_share">your teammates will get an email that gives them access to your team.</p>
                </div>
                <div className="row pl-3 pt-3 pb-1">
                    <div className="txt_share">Share With Email Address</div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <DynamicSelect setContactEmail={setStateMailToContactMail} options={'contacts'} />
                    </div>
                    <div className="col-3 pl-0">
                        <select class="form-control" onChange={(e) => addContactToList(e)}>
                            <option disabled selected>Select...</option>
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
                        <DynamicSelect options={'teams'} addMemberEmailToMembersEmailList={addTeamMemberEmailToMembersEmailList} />
                    </div>
                    <div className="col-3 pl-0">
                        <select class="form-control" onChange={(e) => addMemberTeamToList(e)}>
                            <option disabled selected>Select...</option>
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
                            {/* {renderShareDetailsOfTeam()} */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button onClick={() => console.log(shareDetails)}>share</button>
                </div>
            </div>

        </>
    )

}
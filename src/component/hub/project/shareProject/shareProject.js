import React, { useState } from 'react'
import DynamicSelect from '../../team/dynamicSelect'
import ShareOneMember from '../share/shareOneMember/shareOneMember'
import './shareProject.css'

export default function ShareProject() {
    const [disabledSelectPermission, setDisabledSelectPermission] = useState('false')
    const [shareDetails, setShareDetails] = useState([])
    const [email, setEmail] = useState('')

    const addContactMailToSharedList = (emailMember) => {
        setDisabledSelectPermission('true')
        console.log(disabledSelectPermission);
        setEmail(emailMember.value)
    }
    const addContactToList = (event) => {
        let shareDetail = { 'shareDetail': email, 'permission': event.target.options[event.target.selectedIndex].label }
        setShareDetails([...shareDetails, shareDetail])
    }
    const renderShareDetails = () => {
       return   shareDetails.map(detail => {
            console.log(detail);
            return <ShareOneMember  member={detail}/>
               
        })
    }
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
                    <div className="col-9">
                        <DynamicSelect addContactToShare={addContactMailToSharedList} options={'contacts'} />
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
                    <div className="col">
                        <DynamicSelect options={'teams'} />
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
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
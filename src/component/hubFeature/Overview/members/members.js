import AddMembers from "./addMembers/addMembers";
import ViewMembers from "./veiwMembers/viewMembers";
import React, { useState } from 'react';
import ListMembers from "./listMembers/listMembers";
import './members.css'

export default function Mmebers() {
    const [membersList, setMembersList] = useState(false);
    console.log("membersList", membersList)

    return (
        <>
            <div className="container-fluid px-0 ml-1 " style={{ 'background-color': 'white' }}>

                <div className="row divProjectMembers pt-3 ml-2">
                    <h4>Project Members</h4>
                </div>
                <div className="row">
                    <AddMembers setMembersList={setMembersList} membersList={membersList}/>
                    <ViewMembers />
                </div>
                {
                    membersList ?
                        <div className="positionListMembers d-flex justify-content-center">
                            <ListMembers setMembersList={setMembersList} membersList={membersList} />
                        </div> : null
                }
            </div>
        </>
    )
}
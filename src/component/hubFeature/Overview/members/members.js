import AddMembers from "./addMembers/addMembers";
import ViewMembers from "./veiwMembers/viewMembers";
import React, { useState } from 'react';
import ListMembers from "./listMembers/listMembers";
import $ from 'jquery'
import './members.css'

export default function Mmebers() {
    const [membersList, setMembersList] = useState(false);
    $(window).click(function () {
        if (membersList)
            setMembersList(false);
    });


    return (
        <>
            <div className="container mx-4 pl-3 pb-3 divAllMembers" >

                <div className="row divProjectMembers pt-3 ml-2">
                    <h4>Project Members</h4>
                </div>
                <div className="row">
                    <AddMembers setMembersList={setMembersList} membersList={membersList} />
                    <ViewMembers />
                </div>
                {
                    membersList ?
                        <div className="positionListMembers">
                            <ListMembers setMembersList={setMembersList} membersList={membersList} />
                        </div> : null
                }
            </div>
        </>
    )
}
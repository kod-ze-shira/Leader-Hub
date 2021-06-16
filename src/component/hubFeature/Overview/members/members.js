import AddMembers from "./addMembers/addMembers";
import ViewMembers from "./veiwMembers/viewMembers";
import React from 'react';

export default function Mmebers() {

    return (
        <>
            <div className="container-fluid px-0 backgroundWhiteAndBorderRadius">

                <div className="row divProjectMembers pt-3 ml-2">
                    <h4>Project Members</h4>
                </div>
                <AddMembers />
                <ViewMembers />
            </div>
        </>
    )
}